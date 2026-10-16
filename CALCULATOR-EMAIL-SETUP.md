# First-time setup: calculator email with Resend

This guide walks through setting up Resend for the SA-BPO BPO calculator.

## What this setup will do

When a visitor completes the calculator's first-step contact form and gives consent, the website's Cloudflare Pages Function sends their lead details through Resend. During the trial, the message goes to **`serge@mediabeyondvision.com`**. It is sent from **SA-BPO Calculator <calculator@notifications.sa-bpo.com>**, and replies go to the visitor's company email.

The domains have different roles:

- `sa-bpo.com` is the website domain managed in Cloudflare. We will use its `notifications.sa-bpo.com` subdomain for sending.
- `sa-bpo.co.za` is the email domain whose mailboxes are on Microsoft 365 / Exchange. After the trial, we can change the recipient to `admin@sa-bpo.co.za` without changing the verified `.com` sending domain.

Resend is only the outbound email provider. Microsoft 365 remains responsible for receiving mail at `sa-bpo.co.za`. Do not change the `.co.za` DNS or Microsoft 365 MX records for this setup. The website's separate estimate-email button still opens a draft addressed to `hello@sa-bpo.co.za`; it does not send that estimate automatically.

## Part 1 — Create your Resend account

1. Go to [Resend](https://resend.com/) and choose **Sign up**. Create the account using an email address you can access.
2. Verify your email address if Resend asks you to. Sign in and open the Resend dashboard.
3. Find **Domains** in the dashboard. Resend requires a verified domain before it will send from your own domain.

## Part 2 — Add the sending subdomain in Resend

1. In Resend, open **Domains** and choose **Add Domain**.
2. Enter this exact subdomain:

   `notifications.sa-bpo.com`

   This subdomain is reserved for calculator notification sending. It does not change the website's main `.com` address.
3. If Resend asks for a sending region, select from the options shown and continue.
4. Resend will display DNS records for the domain. Keep the page open and copy those values exactly; DNS record values are specific to your Resend account.

## Part 3 — Add Resend's DNS records in Cloudflare

1. Sign in to [Cloudflare](https://dash.cloudflare.com/).
2. Select the account and website/zone for **`sa-bpo.com`**. Make sure you are editing `.com`, not `sa-bpo.co.za`.
3. Open **DNS** → **Records** and choose **Add record**.
4. For each record Resend lists:
   - Choose the same **Type** (TXT, MX, or CNAME) shown by Resend.
   - Copy the **Name** exactly. Cloudflare may append `.sa-bpo.com` automatically; make sure the final hostname is not duplicated.
   - Copy the **Content/Target/Value** exactly.
   - For MX records, set the priority shown by Resend.
   - Leave TTL at **Auto**, unless Resend says otherwise.
   - If adding a CNAME record, make sure it is **DNS only**, not proxied through Cloudflare.
5. Add only the records Resend specifies for `notifications.sa-bpo.com`. Do not add them to the `.co.za` zone.
6. Do not delete or replace existing root-domain records for `sa-bpo.com` that support the website. Do not change any `.co.za` records or Microsoft 365 MX records.
7. Return to Resend's domain page and choose **Verify** / **Verify DNS Records**. DNS changes may take a little time to appear. If it fails immediately, wait and re-check the record names and values.
8. Continue only when Resend shows `notifications.sa-bpo.com` as **Verified**. If Resend asks you to replace existing root records, stop and ask for help before making that change.

## Part 4 — Create a Resend API key

An API key is a password that allows the website's server-side function to ask Resend to send email.

1. In Resend, open **API Keys** and choose **Create API Key**.
2. Give it a recognizable name, for example `SA-BPO Cloudflare Pages trial`.
3. If Resend offers permission choices, choose a sending-only permission and restrict it to `notifications.sa-bpo.com` if available. The calculator only needs permission to send email.
4. Create the key and copy it while Resend displays it. Resend will not show the full value again later.
5. Keep the key private. Do not put it in website code, GitHub, a public issue, or a message.

## Part 5 — Save the API key as a Cloudflare Pages secret

1. In Cloudflare, open **Workers & Pages** and select the Pages project hosting the SA-BPO website.
2. Open **Settings** → **Variables and Secrets** and choose **Add** (or **Add variable**).
3. Enter this exact name:

   `RESEND_API_KEY`

4. Paste the API key, then select **Encrypt** / **Secret**. Do not save it as plain text.
5. Add it to **Production**. If testing a Preview deployment, add the secret to **Preview** too; the environments are configured separately.
6. Save. Cloudflare will not show the full secret again, which is expected.

## Part 6 — Deploy the updated website code

1. The calculator code uses `RESEND_API_KEY` and sends from `calculator@notifications.sa-bpo.com` to the temporary test inbox `serge@mediabeyondvision.com`.
2. Push the branch containing this code to the GitHub repository connected to the Cloudflare Pages project. Cloudflare Pages must deploy that updated code to use Resend.
3. If you added the secret after the last deployment, trigger a new deployment so the Function receives it.
4. Wait for a successful deployment before testing.

Keep the existing Pages build settings:

- Repository root: `/`
- Build command: `pnpm install --frozen-lockfile && pnpm run build:pages`
- Build output directory: `dist/public`

The Pages Function is in the repository-root `functions/` directory. `client/public/_routes.json` routes only `/api/*` through Functions, leaving static assets on the Pages static path.

## Part 7 — Send a test calculator lead

1. Open the deployed SA-BPO website and open the BPO calculator.
2. Enter test contact details in all required fields and submit the first step with consent.
3. Check **`serge@mediabeyondvision.com`** for the notification. Also check its junk/spam folder.
4. Confirm the email includes the visitor's name, surname, company, position, company email, telephone number, submission time, and consent status.
5. If the message does not appear, check the **Emails** / **Logs** area in Resend. An accepted API request means Resend accepted the message for processing; it does not guarantee the recipient's mailbox placed it in the inbox.
6. Once Resend accepts the message, the production calculator should unlock. If the key is missing or sending fails, the calculator intentionally does not unlock.

## After the test succeeds

Change the fixed recipient in `shared/calculator-intake.ts` from `serge@mediabeyondvision.com` to **`admin@sa-bpo.co.za`**, then commit, push, and deploy the change. Keep the sender as `calculator@notifications.sa-bpo.com`; there is no need to configure Resend or change DNS again just to change the recipient. The Exchange inbox can receive mail sent from the verified `.com` subdomain.

## Common problems

- **Resend says the domain is not verified:** Check the DNS record type, name, and value in the Cloudflare `sa-bpo.com` zone. Wait for DNS updates, then try verification again.
- **The calculator says the email service is not configured:** Confirm the secret is named exactly `RESEND_API_KEY`, is encrypted, applies to the environment being tested, and the Pages project was redeployed after saving it.
- **Resend rejects the sender:** The sender must use the verified subdomain. The current sender is `calculator@notifications.sa-bpo.com`.
- **Resend accepts the email, but the recipient cannot find it:** Check junk/spam and inspect the event in Resend. The recipient's mail security system may quarantine or reject the email after Resend accepts the request.
- **The API key was lost or exposed:** Create a new key in Resend, replace the Cloudflare Pages secret, redeploy, and revoke the old key in Resend.

## Local development

For local-only tests, set `RESEND_API_KEY` in an ignored `.env` file or in the process environment before running `pnpm dev`. `.env.example` is a template and is not loaded as a credential file. Never commit a real key. Without credentials, local preview can still be used without sending personal data.

## Official references

- [Resend: Domains](https://resend.com/docs/dashboard/domains/introduction)
- [Resend: API keys](https://resend.com/docs/dashboard/api-keys/introduction)
- [Resend: Send Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Cloudflare Pages Functions: bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare Pages Functions: routing](https://developers.cloudflare.com/pages/functions/routing/)
