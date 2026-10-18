# BPO calculator email setup with Resend

## Current notification configuration

The calculator uses the Cloudflare Pages Function at `/api/calculator-intake` and Resend for outbound notifications. Automatic calculator notifications are sent from **SA-BPO Calculator <calculator@notifications.sa-bpo.com>** to **`partnerships@sa-bpo.co.za`**. Replies to all calculator messages go to **`partnerships@sa-bpo.co.za`**.

If a visitor gives consent and closes the calculator while still on the details step, a details-only notification is sent to Partnerships. If they continue to the estimate, closing the calculator or choosing **Compose estimate email** sends their contact details and current selections to Partnerships only. Neither close path nor the compose action sends a copy to the visitor.

The **Submit calculator** action sends the completed contact details and estimate to Partnerships and CCs the visitor's company email with a copy. The confirmation copy is sent only when the visitor explicitly submits a completed calculator. The **Compose estimate email** action instead opens a separate draft addressed to **`partnerships@sa-bpo.co.za`**. The visitor must choose to send that draft in their email application; its automatic notification goes to Partnerships only.

The notification recipient, reply-to address, and optional estimate-email draft recipient are all `partnerships@sa-bpo.co.za`. If the visitor does not submit the completed calculator, only Partnerships receives the automatic notification. When the visitor submits the completed calculator, their company email is copied on that submission.

## Domain roles

- `sa-bpo.com` is managed in Cloudflare and provides the verified Resend sending subdomain `notifications.sa-bpo.com`.
- `sa-bpo.co.za` is the Microsoft 365 / Exchange email domain. The automatic calculator notification and optional estimate draft are addressed to `partnerships@sa-bpo.co.za`.

Resend only sends email. Do not change the Microsoft 365 MX records or other DNS for `sa-bpo.co.za` as part of this setup.

## Part 1 — Create your Resend account

1. Go to [Resend](https://resend.com/) and choose **Sign up**.
2. Verify your email address if asked, sign in, and open the Resend dashboard.
3. Open **Domains**. Resend requires a verified domain before it can send mail from your own domain.

## Part 2 — Add the sending subdomain in Resend

1. In Resend, open **Domains** and choose **Add Domain**.
2. Enter exactly **`notifications.sa-bpo.com`**.
3. Select a sending region if Resend asks, then create the domain.
4. Keep the domain page open. Resend will display DNS records specific to your account; copy those exact values.

## Part 3 — Add the DNS records in Cloudflare

1. Sign in to [Cloudflare](https://dash.cloudflare.com/).
2. Select the **`sa-bpo.com`** website/zone. Do not select `sa-bpo.co.za`.
3. Open **DNS → Records** and choose **Add record**.
4. For every record Resend lists:
   - Choose the same **Type** shown by Resend (TXT, MX, or CNAME).
   - Copy the **Name** exactly, checking that Cloudflare has not repeated `.sa-bpo.com` in the final hostname.
   - Copy the **Content/Target/Value** exactly.
   - For MX, copy the priority Resend gives you.
   - Leave TTL at **Auto**, unless Resend instructs otherwise.
   - Set any CNAME mail/authentication records to **DNS only**, not proxied.
5. Save the records. Add only the Resend records for `notifications.sa-bpo.com` to the Cloudflare `.com` zone.
6. Do not delete or replace the existing root `sa-bpo.com` records supporting the website. Do not change the `.co.za` records or Microsoft 365 MX records.
7. Return to Resend and select **Verify** / **Verify DNS Records**. Wait for DNS propagation and re-check the record names and values if verification fails.
8. Continue only when Resend marks `notifications.sa-bpo.com` as **Verified**. If Resend tells you to replace an existing root record, stop and ask for help before changing it.

## Part 4 — Create a Resend API key

1. In Resend, open **API Keys** and choose **Create API Key**.
2. Name it something recognizable, such as `SA-BPO Cloudflare Pages`.
3. If permission choices are shown, choose sending-only and restrict the key to `notifications.sa-bpo.com` if available.
4. Create the key and copy it immediately. Resend will not show the full key again.
5. Keep the key private. Never put it in source code, GitHub, or a public message.

## Part 5 — Save the key in Cloudflare Pages

1. In Cloudflare, open **Workers & Pages** and select the Pages project hosting SA-BPO.
2. Open **Settings → Variables and Secrets** and choose **Add**.
3. Set the name to exactly **`RESEND_API_KEY`**.
4. Paste the Resend key and select **Encrypt** / **Secret**. Do not save it as a plain-text variable.
5. Add it to **Production**. If you use a Preview deployment, add it to **Preview** too; the settings are separate.
6. Save. The secret will not be displayed again.

## Part 6 — Deploy and test

1. Ensure Cloudflare Pages has deployed the latest code from the connected GitHub `main` branch. If you save or change the secret after a deployment, start a new deployment.
2. Open the deployed SA-BPO site, launch the calculator, enter the required contact details and consent, and continue to the calculator.
3. Enter valid details and consent, then close the calculator before continuing. A details-only email should arrive at **`partnerships@sa-bpo.co.za`**, with no user copy.
4. Reopen the calculator, continue, and change the service focus, currency, and advisor count. Close the calculator without submitting; the full estimate should arrive at Partnerships only.
5. Repeat the calculator flow and click **Submit calculator** after completing the estimate. The full submission should arrive at Partnerships with the visitor's company email CC'd. The visitor should also receive the copy, and replying to it should address Partnerships.
6. Try **Compose estimate email**. It opens a draft addressed to `partnerships@sa-bpo.co.za`; the automatic notification goes to Partnerships only. The visitor must send the draft from their email application if they want to send that additional message.
7. If needed, inspect **Emails** / **Logs** in Resend. Resend accepting an API request means it accepted the message for processing, not necessarily that the recipient's mailbox placed it in the inbox.

## If something goes wrong

- **“The secure email service is not configured yet.”** Confirm `RESEND_API_KEY` is an encrypted secret in the correct Pages project and environment (Production or Preview), then redeploy.
- **“We couldn't send your details just now.”** Check that the Resend domain is verified, the API key is valid, the sender is `calculator@notifications.sa-bpo.com`, and the Resend log for the request.
- **The calculator closes without a notification:** Close it using its controls (Close calculator, X, backdrop, or Escape). Closing the browser tab directly can interrupt an in-flight send.
- **The API key is lost or exposed:** Create a new key in Resend, update the encrypted Cloudflare secret, redeploy, and revoke the old key in Resend.

## Local development

For local-only tests, set `RESEND_API_KEY` in an ignored `.env` file or in the process environment before running `pnpm dev`. `.env.example` is only a template. Never commit the real key.

## Official references

- [Resend: Domains](https://resend.com/docs/dashboard/domains/introduction)
- [Resend: API keys](https://resend.com/docs/dashboard/api-keys/introduction)
- [Resend: Send Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Cloudflare Pages Functions: bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare Pages Functions: routing](https://developers.cloudflare.com/pages/functions/routing/)
