import { calculateBpoEstimate, MONTHLY_HOURS, serviceOptions, type Currency } from "./bpo-estimate";

export type CalculatorLead = {
  firstName: string;
  surname: string;
  company: string;
  position: string;
  email: string;
  telephone: string;
};

export type CalculatorSelection = {
  serviceId: string;
  currency: Currency;
  advisorCount: number;
  moreThanThirty: boolean;
};

export type CalculatorEmailEnvironment = {
  RESEND_API_KEY?: string;
};

export type CalculatorIntakeResult = {
  status: number;
  body: { ok: true } | { error: string };
};

type RateWindow = { startedAt: number; count: number };
type ResendApiResponse = { id?: string };

const RECIPIENT = "admin@sa-bpo.co.za";
const SENDER = "SA-BPO Calculator <calculator@notifications.sa-bpo.com>";
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_WINDOW_MAX = 5;
const MAX_BODY_LENGTH = 12 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,30}$/;
const rateWindows = new Map<string, RateWindow>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readLead(body: unknown): CalculatorLead | null {
  if (!isRecord(body)) return null;

  const limits = {
    firstName: 80,
    surname: 80,
    company: 120,
    position: 100,
    email: 254,
    telephone: 30,
  } as const;

  const lead: CalculatorLead = {
    firstName: typeof body.firstName === "string" ? body.firstName.trim() : "",
    surname: typeof body.surname === "string" ? body.surname.trim() : "",
    company: typeof body.company === "string" ? body.company.trim() : "",
    position: typeof body.position === "string" ? body.position.trim() : "",
    email: typeof body.email === "string" ? body.email.trim().toLowerCase() : "",
    telephone: typeof body.telephone === "string" ? body.telephone.trim() : "",
  };

  if (
    !lead.firstName ||
    !lead.surname ||
    !lead.company ||
    !lead.position ||
    !lead.email ||
    !lead.telephone ||
    lead.firstName.length > limits.firstName ||
    lead.surname.length > limits.surname ||
    lead.company.length > limits.company ||
    lead.position.length > limits.position ||
    lead.email.length > limits.email ||
    lead.telephone.length > limits.telephone ||
    !EMAIL_PATTERN.test(lead.email) ||
    !PHONE_PATTERN.test(lead.telephone)
  ) {
    return null;
  }

  const phoneDigits = lead.telephone.replace(/\D/g, "");
  return phoneDigits.length >= 7 && phoneDigits.length <= 15 ? lead : null;
}

function readCalculatorSelection(value: unknown): CalculatorSelection | null {
  if (!isRecord(value)) return null;
  const { serviceId, currency, advisorCount, moreThanThirty } = value;
  if (
    typeof serviceId !== "string" ||
    !serviceOptions.some((service) => service.id === serviceId) ||
    (currency !== "USD" && currency !== "GBP") ||
    typeof advisorCount !== "number" ||
    !Number.isInteger(advisorCount) ||
    typeof moreThanThirty !== "boolean" ||
    (moreThanThirty && (advisorCount < 31 || advisorCount > 1000)) ||
    (!moreThanThirty && (advisorCount < 1 || advisorCount > 30))
  ) {
    return null;
  }

  return { serviceId, currency, advisorCount, moreThanThirty };
}

function isRateLimited(clientAddress: string): boolean {
  const now = Date.now();
  const key = clientAddress || "unknown";
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

const formatCurrency = (amount: number, currency: Currency) => new Intl.NumberFormat(
  currency === "USD" ? "en-US" : "en-GB",
  { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 },
).format(amount);

async function sendLeadEmail(
  lead: CalculatorLead,
  env: CalculatorEmailEnvironment,
  calculator?: CalculatorSelection,
): Promise<void> {
  const apiKey = env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Email service is not configured");
  }

  const safeCompany = lead.company.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").slice(0, 120);
  const text = [
    calculator ? "Completed BPO calculator estimate" : "New BPO calculator access request",
    "",
    `Name: ${lead.firstName} ${lead.surname}`,
    `Company: ${lead.company}`,
    `Position: ${lead.position}`,
    `Company email: ${lead.email}`,
    `Telephone: ${lead.telephone}`,
    ...(calculator ? (() => {
      const estimate = calculateBpoEstimate(calculator.currency, calculator.serviceId, calculator.advisorCount);
      return [
        "",
        "Calculator selections and indicative estimate:",
        `Service focus: ${estimate.selectedService.label}`,
        `Service option: ${calculator.serviceId}`,
        `Currency: ${calculator.currency}`,
        `Advisor count selected: ${calculator.advisorCount}`,
        `More than 30 advisors selected: ${calculator.moreThanThirty ? "Yes" : "No"}`,
        `Rate tier applied: ${estimate.tierLabel}`,
        `Hourly rate per advisor: ${formatCurrency(estimate.hourlyRate, calculator.currency)}`,
        `Monthly rate per advisor: ${formatCurrency(estimate.monthlyPerAdvisor, calculator.currency)}`,
        `Total indicative monthly invoice: ${formatCurrency(estimate.monthlyTotal, calculator.currency)}`,
        `Working assumptions: 9 hours per day, 45 hours per week, ${MONTHLY_HOURS} working hours per month.`,
      ];
    })() : []),
    "",
    `Received: ${new Date().toISOString()}`,
    "Consent to process the calculator enquiry: Yes",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: lead.email,
      subject: `${calculator ? "BPO calculator estimate" : "BPO calculator access request"} — ${safeCompany}`,
      text,
    }),
  });

  const apiResult = (await response.json().catch(() => null)) as ResendApiResponse | null;
  if (!response.ok || !apiResult?.id) {
    throw new Error("Email service did not accept the calculator lead");
  }
}

export async function processCalculatorIntake(
  body: unknown,
  env: CalculatorEmailEnvironment,
  clientAddress: string,
): Promise<CalculatorIntakeResult> {
  if (isRecord(body) && typeof body.website === "string" && body.website.trim()) {
    return { status: 202, body: { ok: true } };
  }

  const lead = readLead(body);
  if (!lead || !isRecord(body) || body.consent !== true) {
    return { status: 400, body: { error: "Check your details and consent, then try again." } };
  }

  const hasCalculatorSelection = Object.prototype.hasOwnProperty.call(body, "calculator");
  const calculator = hasCalculatorSelection ? readCalculatorSelection(body.calculator) : undefined;
  if (calculator === null) {
    return { status: 400, body: { error: "Check your calculator selections and try again." } };
  }

  if (isRateLimited(clientAddress)) {
    return { status: 429, body: { error: "Too many requests. Please wait a few minutes and try again." } };
  }

  if (!env.RESEND_API_KEY?.trim()) {
    return {
      status: 503,
      body: { error: "The secure email service is not configured yet. Please try again later or contact SA-BPO directly." },
    };
  }

  try {
    await sendLeadEmail(lead, env, calculator);
    return { status: 200, body: { ok: true } };
  } catch {
    // Do not log lead data, API credentials, or provider responses.
    return { status: 502, body: { error: "We couldn't send your details just now. Please try again shortly." } };
  }
}

export { MAX_BODY_LENGTH };
