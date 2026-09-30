export type CalculatorLead = {
  firstName: string;
  surname: string;
  company: string;
  position: string;
  email: string;
  telephone: string;
};

export type CalculatorEmailEnvironment = {
  CF_ACCOUNT_ID?: string;
  CF_EMAIL_API_TOKEN?: string;
  CF_EMAIL_FROM?: string;
};

export type CalculatorIntakeResult = {
  status: number;
  body: { ok: true } | { error: string };
};

type RateWindow = { startedAt: number; count: number };
type CloudflareSendResult = {
  delivered?: string[];
  queued?: string[];
  permanent_bounces?: string[];
};
type CloudflareApiResponse = {
  success?: boolean;
  result?: CloudflareSendResult | null;
};

const RECIPIENT = "admin@sa-bpo.co.za";
const DEFAULT_SENDER = "calculator@sa-bpo.co.za";
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

async function sendLeadEmail(lead: CalculatorLead, env: CalculatorEmailEnvironment): Promise<void> {
  const accountId = env.CF_ACCOUNT_ID?.trim();
  const apiToken = env.CF_EMAIL_API_TOKEN?.trim();
  const from = env.CF_EMAIL_FROM?.trim() || DEFAULT_SENDER;

  if (!accountId || !apiToken || !EMAIL_PATTERN.test(from)) {
    throw new Error("Email service is not configured");
  }

  const safeCompany = lead.company.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").slice(0, 120);
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

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: RECIPIENT,
        from,
        reply_to: lead.email,
        subject: `BPO calculator access request — ${safeCompany}`,
        text,
      }),
    },
  );

  const apiResult = (await response.json().catch(() => null)) as CloudflareApiResponse | null;
  const delivery = apiResult?.result;
  const deliveredOrQueued = [...(delivery?.delivered ?? []), ...(delivery?.queued ?? [])].map((address) => address.toLowerCase());
  const permanentlyBounced = (delivery?.permanent_bounces ?? []).map((address) => address.toLowerCase());

  if (
    !response.ok ||
    apiResult?.success !== true ||
    permanentlyBounced.includes(RECIPIENT) ||
    !deliveredOrQueued.includes(RECIPIENT)
  ) {
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

  if (isRateLimited(clientAddress)) {
    return { status: 429, body: { error: "Too many requests. Please wait a few minutes and try again." } };
  }

  if (!env.CF_ACCOUNT_ID?.trim() || !env.CF_EMAIL_API_TOKEN?.trim()) {
    return {
      status: 503,
      body: { error: "The secure email service is not configured yet. Please try again later or contact SA-BPO directly." },
    };
  }

  try {
    await sendLeadEmail(lead, env);
    return { status: 200, body: { ok: true } };
  } catch {
    // Do not log lead data, API credentials, or provider responses.
    return { status: 502, body: { error: "We couldn't send your details just now. Please try again shortly." } };
  }
}

export { MAX_BODY_LENGTH };
