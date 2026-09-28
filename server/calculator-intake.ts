import express, { type Request, type Response } from "express";
import nodemailer from "nodemailer";

type Lead = {
  firstName: string;
  surname: string;
  company: string;
  position: string;
  email: string;
  telephone: string;
};

type RateWindow = { startedAt: number; count: number };
const rateWindows = new Map<string, RateWindow>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_WINDOW_MAX = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,30}$/;

function readLead(body: unknown): Lead | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;
  const fields = ["firstName", "surname", "company", "position", "email", "telephone"] as const;
  const values = Object.fromEntries(fields.map((field) => [field, typeof input[field] === "string" ? input[field].trim() : ""])) as Record<typeof fields[number], string>;
  const limits: Record<typeof fields[number], number> = {
    firstName: 80,
    surname: 80,
    company: 120,
    position: 100,
    email: 254,
    telephone: 30,
  };
  if (fields.some((field) => !values[field] || values[field].length > limits[field])) return null;
  if (!EMAIL_PATTERN.test(values.email)) return null;
  if (!PHONE_PATTERN.test(values.telephone)) return null;
  const phoneDigits = values.telephone.replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) return null;
  return values;
}

function isRateLimited(req: Request): boolean {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const current = rateWindows.get(key);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    rateWindows.set(key, { startedAt: now, count: 1 });
    if (rateWindows.size > 2_000) {
      rateWindows.forEach((window, address) => {
        if (now - window.startedAt >= RATE_WINDOW_MS) rateWindows.delete(address);
      });
    }
    return false;
  }
  current.count += 1;
  return current.count > RATE_WINDOW_MAX;
}

function createTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  if (!host || !user || !password || !Number.isInteger(port) || port < 1 || port > 65535) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export function createCalculatorIntakeRouter() {
  const router = express.Router();
  router.post("/calculator-intake", async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown> | undefined;
    // Quietly accept bot submissions caught by the hidden honeypot without sending email.
    if (typeof body?.website === "string" && body.website.trim()) {
      res.status(202).json({ ok: true });
      return;
    }

    const lead = readLead(req.body);
    if (!lead || body?.consent !== true) {
      res.status(400).json({ error: "Check your details and consent, then try again." });
      return;
    }
    if (isRateLimited(req)) {
      res.status(429).json({ error: "Too many requests. Please wait a few minutes and try again." });
      return;
    }

    const transporter = createTransporter();
    const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim();
    if (!transporter || !from) {
      res.status(503).json({ error: "The secure email service is not configured yet. Please try again later or contact SA-BPO directly." });
      return;
    }

    const text = [
      "New BPO calculator access request",
      "",
      `Name: ${lead.firstName} ${lead.surname}`,
      `Company: ${lead.company}`,
      `Position: ${lead.position}`,
      `Company email: ${lead.email}`,
      `Telephone: ${lead.telephone}`,
      "",
      `Received: ${new Date().toISOString()}`,
      "Consent to follow up: Yes",
    ].join("\n");

    try {
      await transporter.sendMail({
        from,
        to: "outsourcing@sa-bpo.co.za",
        replyTo: lead.email,
        subject: `BPO calculator access request — ${lead.company}`,
        text,
      });
      res.status(200).json({ ok: true });
    } catch {
      // Do not log lead data, SMTP credentials, or provider error responses.
      res.status(502).json({ error: "We couldn't send your details just now. Please try again shortly." });
    }
  });
  return router;
}
