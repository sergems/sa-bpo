import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail, ShieldCheck, Sparkles, X } from "lucide-react";

export type Currency = "USD" | "GBP";
type LeadData = {
  firstName: string;
  surname: string;
  company: string;
  position: string;
  email: string;
  telephone: string;
};
type LeadDraft = LeadData & { website: string };
type ServiceOption = {
  id: string;
  label: string;
  rates: Record<Currency, [number, number, number]>;
};
type Props = { onClose: () => void };

const MONTHLY_HOURS = 195;
export const serviceOptions: ServiceOption[] = [
  { id: "customer-service", label: "Customer Service", rates: { USD: [12.5, 12.15, 11.75], GBP: [9.5, 9, 8.75] } },
  { id: "outbound-sales", label: "Outbound Sales — No Data Provided", rates: { USD: [13.5, 13.1625, 12.825], GBP: [10, 9.75, 9.5] } },
  { id: "inbound-sales", label: "Inbound Sales and Retentions", rates: { USD: [13.1625, 12.825, 12.4875], GBP: [9.75, 9.5, 9.25] } },
  { id: "complaints", label: "Complaints and Escalations", rates: { USD: [13.5, 13.1625, 12.825], GBP: [10, 9.75, 9.5] } },
  { id: "ecommerce", label: "E-Commerce Support", rates: { USD: [16.2, 15.525, 14.85], GBP: [12, 11.5, 11] } },
  { id: "after-hours", label: "Out Of Hours Support / Night Shift", rates: { USD: [8.775, 8.4375, 8.1], GBP: [6.5, 6.25, 6] } },
];

export function calculateBpoEstimate(currency: Currency, serviceId: string, advisorCount: number) {
  const safeCount = Math.max(1, Math.round(advisorCount || 1));
  const tierIndex: 0 | 1 | 2 = safeCount <= 12 ? 0 : safeCount <= 24 ? 1 : 2;
  const selectedService = serviceOptions.find((service) => service.id === serviceId) ?? serviceOptions[0];
  const hourlyRate = selectedService.rates[currency][tierIndex];
  const monthlyPerAdvisor = hourlyRate * MONTHLY_HOURS;
  return {
    selectedService,
    tierIndex,
    hourlyRate,
    monthlyPerAdvisor,
    monthlyTotal: monthlyPerAdvisor * safeCount,
    tierLabel: tierIndex === 0 ? "1–12 advisors" : tierIndex === 1 ? "13–24 advisors" : "25–30 advisor base rate",
  };
}

const inclusions = [
  "Advisor salary, most competitive rates and commissions in Durban",
  "Dedicated Team Leader",
  "Operations Manager",
  "IT infrastructure and software",
  "Dell systems",
  "Microsoft",
  "Telephony platform",
  "Reporting Suites (Power BI)",
  "World-class facility and connectivity",
  "Three links routing across Africa to ensure 99.9% uptime",
  "All Tier 1 carriers",
  "Back-up power and water",
];

const formatCurrency = (amount: number, currency: Currency) => new Intl.NumberFormat(
  currency === "USD" ? "en-US" : "en-GB",
  { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 },
).format(amount);

const emptyDraft: LeadDraft = {
  firstName: "",
  surname: "",
  company: "",
  position: "",
  email: "",
  telephone: "",
  website: "",
};

type CalculatorSession = {
  step: "lead" | "calculator";
  draft: LeadDraft;
  lead: LeadData | null;
  consent: boolean;
  previewOnly: boolean;
  currency: Currency;
  serviceId: string;
  advisors: number;
  moreThanThirty: boolean;
  largeAdvisorCount: string;
};

const SESSION_COOKIE_NAME = "sa_bpo_calculator_session";
const SESSION_STORAGE_PREFIX = "sa-bpo-calculator-session:";
const leadFields: (keyof LeadData)[] = ["firstName", "surname", "company", "position", "email", "telephone"];

function readSessionIdFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${SESSION_COOKIE_NAME}=`;
  const entry = document.cookie.split(";").map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(prefix));
  if (!entry) return null;
  try {
    const sessionId = decodeURIComponent(entry.slice(prefix.length));
    return /^[a-zA-Z0-9-]{1,80}$/.test(sessionId) ? sessionId : null;
  } catch {
    return null;
  }
}

function ensureSessionCookie(): string | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  const existingId = readSessionIdFromCookie();
  if (existingId) return existingId;
  const sessionId = window.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}; Path=/; SameSite=Lax${secure}`;
  return sessionId;
}

function clearCalculatorSession(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const sessionId = readSessionIdFromCookie();
  if (sessionId) {
    try {
      window.sessionStorage.removeItem(`${SESSION_STORAGE_PREFIX}${sessionId}`);
    } catch {
      // Keep the calculator usable if browser storage is unavailable.
    }
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
}

function isLeadData(value: unknown): value is LeadData {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return leadFields.every((field) => typeof record[field] === "string");
}

function readCalculatorSession(): CalculatorSession | null {
  if (typeof window === "undefined") return null;
  const sessionId = readSessionIdFromCookie();
  if (!sessionId) return null;
  try {
    const savedText = window.sessionStorage.getItem(`${SESSION_STORAGE_PREFIX}${sessionId}`);
    if (!savedText) return null;
    const saved = JSON.parse(savedText) as Partial<CalculatorSession> | null;
    if (!saved || typeof saved !== "object" || saved.consent !== true || !saved.draft || typeof saved.draft !== "object") return null;

    const savedDraft = saved.draft as Partial<LeadDraft>;
    const draft: LeadDraft = { ...emptyDraft };
    for (const field of leadFields) {
      if (typeof savedDraft[field] === "string") draft[field] = savedDraft[field] as string;
    }
    const lead = isLeadData(saved.lead) ? saved.lead : null;
    const advisorValue = Number(saved.advisors);
    const serviceId = typeof saved.serviceId === "string" && serviceOptions.some((service) => service.id === saved.serviceId)
      ? saved.serviceId
      : serviceOptions[0].id;
    return {
      step: saved.step === "calculator" && lead ? "calculator" : "lead",
      draft,
      lead,
      consent: true,
      previewOnly: saved.previewOnly === true,
      currency: saved.currency === "GBP" ? "GBP" : "USD",
      serviceId,
      advisors: Number.isFinite(advisorValue) ? Math.min(30, Math.max(1, Math.round(advisorValue))) : 12,
      moreThanThirty: saved.moreThanThirty === true,
      largeAdvisorCount: typeof saved.largeAdvisorCount === "string" && /^\d{1,4}$/.test(saved.largeAdvisorCount) ? saved.largeAdvisorCount : "31",
    };
  } catch {
    return null;
  }
}

export default function BpoCalculatorModal({ onClose }: Props) {
  const [sessionSeed] = useState(() => readCalculatorSession());
  const [step, setStep] = useState<"lead" | "calculator">(sessionSeed?.step ?? "lead");
  const [draft, setDraft] = useState<LeadDraft>(sessionSeed?.draft ?? emptyDraft);
  const [lead, setLead] = useState<LeadData | null>(sessionSeed?.lead ?? null);
  const [consent, setConsent] = useState(sessionSeed?.consent ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [previewOnly, setPreviewOnly] = useState(sessionSeed?.previewOnly ?? false);
  const [currency, setCurrency] = useState<Currency>(sessionSeed?.currency ?? "USD");
  const [serviceId, setServiceId] = useState(sessionSeed?.serviceId ?? serviceOptions[0].id);
  const [advisors, setAdvisors] = useState(sessionSeed?.advisors ?? 12);
  const [moreThanThirty, setMoreThanThirty] = useState(sessionSeed?.moreThanThirty ?? false);
  const [largeAdvisorCount, setLargeAdvisorCount] = useState(sessionSeed?.largeAdvisorCount ?? "31");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!consent) return;
    try {
      const sessionId = ensureSessionCookie();
      if (!sessionId) return;
      const session: CalculatorSession = { step, draft, lead, consent: true, previewOnly, currency, serviceId, advisors, moreThanThirty, largeAdvisorCount };
      window.sessionStorage.setItem(`${SESSION_STORAGE_PREFIX}${sessionId}`, JSON.stringify(session));
    } catch {
      // Session persistence is an enhancement; the calculator remains usable without browser storage.
    }
  }, [step, draft, lead, consent, previewOnly, currency, serviceId, advisors, moreThanThirty, largeAdvisorCount]);

  const advisorCount = moreThanThirty ? Math.max(31, Number(largeAdvisorCount) || 31) : advisors;
  const { selectedService, hourlyRate, monthlyPerAdvisor, monthlyTotal, tierLabel } = calculateBpoEstimate(currency, serviceId, advisorCount);

  const emailDraft = useMemo(() => {
    if (!lead) return "";
    const subject = `BPO calculator estimate — ${lead.company}`;
    const lines = [
      "Hello SA-BPO team,",
      "",
      "I would like to discuss this indicative BPO calculator estimate:",
      "",
      `Name: ${lead.firstName} ${lead.surname}`,
      `Company: ${lead.company}`,
      `Position: ${lead.position}`,
      `Company email: ${lead.email}`,
      `Telephone: ${lead.telephone}`,
      "",
      `Service focus: ${selectedService.label}`,
      `Advisors required: ${advisorCount}`,
      `Currency: ${currency}`,
      `Rate tier: ${tierLabel}`,
      `Hourly rate per advisor: ${formatCurrency(hourlyRate, currency)}`,
      `Monthly rate per advisor: ${formatCurrency(monthlyPerAdvisor, currency)}`,
      `Total indicative monthly invoice: ${formatCurrency(monthlyTotal, currency)}`,
      "Working assumptions: 9 hours per day, 45 hours per week, 195 working hours per month.",
      ...(moreThanThirty ? ["For 31+ advisors, the estimate uses the 25–30 advisor base rate. The SA-BPO team will follow up within 48 hours to discuss the requirements."] : []),
      "",
      "These prices are indicative. SA-BPO will gather more information to prepare a tailored quote.",
    ];
    return `mailto:hello@sa-bpo.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [lead, selectedService.label, advisorCount, currency, tierLabel, hourlyRate, monthlyPerAdvisor, monthlyTotal, moreThanThirty]);

  const updateDraft = (field: keyof LeadDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    if (formError) setFormError("");
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const cleanLead: LeadData = {
      firstName: draft.firstName.trim(),
      surname: draft.surname.trim(),
      company: draft.company.trim(),
      position: draft.position.trim(),
      email: draft.email.trim().toLowerCase(),
      telephone: draft.telephone.trim(),
    };
    const phoneDigits = cleanLead.telephone.replace(/\D/g, "");
    if (!consent) {
      setFormError("Please confirm that SA-BPO may use these details to respond to your enquiry.");
      return;
    }
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setFormError("Enter a telephone number containing 7 to 15 digits, including your country code if applicable.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/calculator-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cleanLead, consent, website: draft.website }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok && import.meta.env.DEV && response.status === 503) {
        setLead(cleanLead);
        setPreviewOnly(true);
        setStep("calculator");
        return;
      }
      if (!response.ok) throw new Error(result.error || "We couldn't send your details. Please try again.");
      setLead(cleanLead);
      setStep("calculator");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "We couldn't send your details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop bpo-calculator-backdrop" onClick={onClose}>
      <section className="calculator-modal bpo-calculator-modal" role="dialog" aria-modal="true" aria-labelledby="bpo-calculator-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close BPO calculator"><X /></button>
        <div className="calculator-modal-body bpo-calculator-body">
          {step === "lead" ? (
            <>
              <p className="modal-kicker"><Sparkles size={15} aria-hidden="true" /> BPO calculator <span className="bpo-step-count">01 / 02</span></p>
              <h2 id="bpo-calculator-title" className="calculator-modal-title">Start with a <em>clear picture.</em></h2>
              <p className="bpo-calculator-intro">First, tell us who you are. Your details are sent securely to our outsourcing team so they can follow up on your estimate.</p>
              <form className="bpo-intake-form" onSubmit={submitLead}>
                <div className="bpo-intake-grid">
                  <label htmlFor="bpo-first-name">Name<input id="bpo-first-name" name="firstName" autoComplete="given-name" value={draft.firstName} onChange={(event) => updateDraft("firstName", event.target.value)} maxLength={80} required autoFocus /></label>
                  <label htmlFor="bpo-surname">Surname<input id="bpo-surname" name="surname" autoComplete="family-name" value={draft.surname} onChange={(event) => updateDraft("surname", event.target.value)} maxLength={80} required /></label>
                  <label htmlFor="bpo-company">Company<input id="bpo-company" name="company" autoComplete="organization" value={draft.company} onChange={(event) => updateDraft("company", event.target.value)} maxLength={120} required /></label>
                  <label htmlFor="bpo-position">Position<input id="bpo-position" name="position" autoComplete="organization-title" value={draft.position} onChange={(event) => updateDraft("position", event.target.value)} maxLength={100} required /></label>
                  <label htmlFor="bpo-company-email">Company email<input id="bpo-company-email" name="email" type="email" autoComplete="email" value={draft.email} onChange={(event) => updateDraft("email", event.target.value)} maxLength={254} required /></label>
                  <label htmlFor="bpo-telephone">Telephone number<input id="bpo-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" value={draft.telephone} onChange={(event) => updateDraft("telephone", event.target.value)} maxLength={30} required /></label>
                </div>
                <label className="bpo-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={draft.website} onChange={(event) => updateDraft("website", event.target.value)} /></label>
                <label className="bpo-consent"><input type="checkbox" checked={consent} onChange={(event) => {
                  const optedIn = event.target.checked;
                  setConsent(optedIn);
                  if (!optedIn) clearCalculatorSession();
                }} required /><span>I agree that SA-BPO may use these details to respond to this calculator enquiry.</span></label>
                {formError && <p className="bpo-form-error" role="alert">{formError}</p>}
                <button className="button button--green button--full bpo-submit-button" type="submit" disabled={submitting}>
                  {submitting ? <><LoaderCircle size={17} className="bpo-spinner" /> Sending details…</> : <>Continue to calculator <ArrowRight size={17} /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="modal-kicker"><CheckCircle2 size={15} aria-hidden="true" /> Details validated <span className="bpo-step-count">02 / 02</span></p>
              <div className={`bpo-calculator-welcome${previewOnly ? " bpo-calculator-welcome--preview" : ""}`}><div><p className="bpo-welcome-label">Welcome</p><h2 id="bpo-calculator-title">{lead?.firstName}, let's shape your <em>first estimate.</em></h2></div>{!previewOnly && <p>Your details have been sent to our outsourcing team.</p>}</div>
              <div className="bpo-calculator-controls">
                <label className="bpo-service-picker" htmlFor="bpo-service-focus">Service focus
                  <select className="bpo-service-select" id="bpo-service-focus" name="bpo-service" value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
                    {serviceOptions.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}
                  </select>
                  <small className="bpo-service-help">Select a service focus from the dropdown to view its estimate.</small>
                </label>
                <div className="bpo-calc-settings">
                  <fieldset className="bpo-currency-fieldset"><legend>Currency</legend><div className="bpo-currency-switch">
                    {(["USD", "GBP"] as const).map((option) => <label className={currency === option ? "is-selected" : ""} key={option}><input type="radio" name="bpo-currency" value={option} checked={currency === option} onChange={() => setCurrency(option)} /><span>{option === "USD" ? "$ USD" : "£ GBP"}</span></label>)}
                  </div></fieldset>
                  <div className="bpo-advisor-control"><label htmlFor="bpo-advisor-range">Advisors required for launch <output>{moreThanThirty ? `${advisorCount}+` : advisors}</output></label><input id="bpo-advisor-range" type="range" min="1" max="30" value={advisors} disabled={moreThanThirty} onChange={(event) => setAdvisors(Number(event.target.value))} /><div className="bpo-range-labels"><span>1 advisor</span><span>30 advisors</span></div></div>
                  <label className="bpo-over-thirty"><input type="checkbox" checked={moreThanThirty} onChange={(event) => setMoreThanThirty(event.target.checked)} /><span>I need more than 30 advisors</span></label>
                  {moreThanThirty && <label className="bpo-large-count" htmlFor="bpo-large-advisors">Advisor count<input id="bpo-large-advisors" type="number" min={31} max={1000} step={1} value={largeAdvisorCount} onChange={(event) => setLargeAdvisorCount(event.target.value)} onBlur={() => setLargeAdvisorCount(String(Math.min(1000, Math.max(31, Number(largeAdvisorCount) || 31))))} /></label>}
                </div>
              </div>
              <section className="bpo-estimate" aria-live="polite" aria-labelledby="bpo-estimate-heading">
                <div className="bpo-estimate-heading"><div><p>Indicative estimate for {lead?.firstName}</p><h3 id="bpo-estimate-heading">{selectedService.label}</h3></div><span className="bpo-tier-badge">{tierLabel}</span></div>
                <div className="bpo-estimate-metrics">
                  <div><span>Hourly rate / advisor</span><strong>{formatCurrency(hourlyRate, currency)}</strong></div>
                  <div><span>Monthly rate / advisor</span><strong>{formatCurrency(monthlyPerAdvisor, currency)}</strong></div>
                  <div className="bpo-estimate-total"><span>Total monthly invoice</span><strong>{formatCurrency(monthlyTotal, currency)}</strong><small>{advisorCount} advisor{advisorCount === 1 ? "" : "s"} × {formatCurrency(monthlyPerAdvisor, currency)}</small></div>
                </div>
                <div className="bpo-hours-note"><ShieldCheck size={17} aria-hidden="true" /><span>Based on <strong>9 hours per day</strong>, <strong>45 hours per week</strong>, and <strong>195 working hours per month</strong>.</span></div>
                {moreThanThirty && <p className="bpo-large-team-note">For more than 30 advisors, this estimate uses the 25–30 advisor base rate. Our team will be in touch within the next 48 hours to discuss your requirements.</p>}
              </section>
              <details className="bpo-inclusions"><summary>What is included in the rate?</summary><ul>{inclusions.map((item) => <li key={item}>{item}</li>)}</ul></details>
              <p className="bpo-disclaimer">These prices are indicative and intended to provide an initial guide. Our associates will gather more information to create a tailored quote for your business requirements.</p>
              <div className="bpo-result-actions">
                <a className="button button--green button--full" href={emailDraft}><Mail size={17} /> Compose estimate email <ArrowRight size={17} /></a>
                <button className="bpo-close-button" type="button" onClick={onClose}>Close calculator</button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
