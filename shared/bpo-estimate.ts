export type Currency = "USD" | "GBP";
export type ServiceOption = {
  id: string;
  label: string;
  rates: Record<Currency, [number, number, number]>;
};

export const MONTHLY_HOURS = 195;

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
