# BPO calculator email setup for Cloudflare Pages

The calculator's lead gate now runs on a Cloudflare Pages Function at `/api/calculator-intake`. The function validates the six requested contact fields and consent, then sends the lead to the fixed inbox `admin@sa-bpo.co.za` through Cloudflare Email Service's HTTPS REST API. The API token stays server-side in an encrypted Pages secret. No mailbox password or SMTP AUTH is used.

The function deliberately fails closed in production: if email delivery is not configured or Cloudflare rejects the send, the calculator does not unlock. The local Vite preview retains its existing preview-only fallback when the server reports that email delivery is not configured.

## Free-tier fit

Cloudflare Workers Free includes up to 100,000 dynamic requests per day; static asset requests do not count. Pages Function calls count toward that daily allowance. Cloudflare Email Service does not allow arbitrary outbound recipients on Workers Free, but messages to a verified destination address in the same Cloudflare account are free and do not count toward sending quotas. This application sends only to `admin@sa-bpo.co.za`, so verify that address as a destination before launch. The visitor's separate estimate-email action remains a `mailto:` draft to `hello@sa-bpo.co.za` and sends nothing automatically.

If the Cloudflare account does not offer the verified-destination exception or the account cannot use Email Sending on Free, a paid Cloudflare plan or a different email API provider would be needed; do not switch on paid billing without approval.

## One-time Cloudflare account setup

1. In Cloudflare, open **Compute > Email Service > Email Sending**, choose **Onboard Domain**, and onboard `sa-bpo.co.za`. Use the Email Sending setup only. It creates sending/bounce-authentication records under `cf-bounce.sa-bpo.co.za` and a DMARC record. It does not replace the root MX records used by Microsoft 365. Review any existing `_dmarc.sa-bpo.co.za` record first and merge/retain your existing policy rather than creating conflicting DMARC records.
2. In **Compute > Email Service > Email Routing > Destination Addresses**, add `admin@sa-bpo.co.za` and verify it by opening the confirmation email in that mailbox. This account-level verification is what allows the fixed-recipient Free-tier send.
3. Create a Cloudflare API token limited to the SA-BPO account with **Email Sending: Edit** permission. Do not use a global API key. The token is a secret and must not be pasted into source code, a browser variable, Git, or chat.
4. In the Cloudflare Pages project, open **Settings > Variables and Secrets** and add these Production values:

   | Name | Value | Storage |
   |---|---|---|
   | `CF_ACCOUNT_ID` | Cloudflare account ID | Plain variable |
   | `CF_EMAIL_API_TOKEN` | API token from step 3 | Encrypted secret |
   | `CF_EMAIL_FROM` | `calculator@sa-bpo.co.za` (or another address on the onboarded domain) | Plain variable |

5. Set the Pages build configuration to repository root `/`, build command `pnpm install --frozen-lockfile && pnpm run build:pages`, and output directory `dist/public`. The Pages Function is in the repository-root `functions/` directory; `client/public/_routes.json` ensures it runs only for `/api/*` and leaves static assets on Pages' static path. Redeploy after adding the secrets.

**Do not onboard Cloudflare Email Routing for the root domain or replace the root MX records** while Microsoft 365 is handling incoming mail. The verified destination can be registered at the account level without moving inbound mail to Cloudflare Routing.

## Local development

For local delivery tests, provide `CF_ACCOUNT_ID`, `CF_EMAIL_API_TOKEN`, and optionally `CF_EMAIL_FROM` in the process environment before running `pnpm dev`. The repository's `.env.example` is a template only; it is not loaded as a credential file. Never place a real token in a committed file. Without credentials, local Preview mode lets you inspect the calculator without sending personal data.

## What the lead email contains

- Name and surname
- Company and position
- Company email and telephone
- Submission time and consent status

The message is sent to `admin@sa-bpo.co.za` with the visitor's company email as `Reply-To`. The calculator is unlocked only after Cloudflare's API confirms the admin address was delivered or queued.

## Official references

- [Cloudflare Email Service: sending emails](https://developers.cloudflare.com/email-service/get-started/send-emails/)
- [Cloudflare Email Service: REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/)
- [Cloudflare Email Service: pricing](https://developers.cloudflare.com/email-service/platform/pricing/)
- [Cloudflare Email Service: domain DNS records](https://developers.cloudflare.com/email-service/configuration/domains/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare Pages Function bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare Pages Function routing](https://developers.cloudflare.com/pages/functions/routing/)
