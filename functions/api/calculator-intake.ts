import {
  MAX_BODY_LENGTH,
  processCalculatorIntake,
  type CalculatorEmailEnvironment,
} from "../../shared/calculator-intake";

type PagesContext = {
  request: Request;
  env: CalculatorEmailEnvironment;
};

function jsonResponse(body: unknown, status: number, additionalHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...additionalHeaders,
    },
  });
}

export async function onRequest({ request, env }: PagesContext): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return jsonResponse({ error: "Expected a JSON request." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_LENGTH) {
    return jsonResponse({ error: "Request is too large." }, 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: "Unable to read the request." }, 400);
  }

  if (rawBody.length > MAX_BODY_LENGTH) {
    return jsonResponse({ error: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Invalid JSON request." }, 400);
  }

  const clientAddress = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const result = await processCalculatorIntake(body, env, clientAddress);
  return jsonResponse(result.body, result.status);
}
