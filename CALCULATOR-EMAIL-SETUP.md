# First-time setup: calculator email with Resend

This guide walks through setting up Resend for the SA-BPO BPO calculator, even if you have never used Resend before.

## What this setup will do

When a visitor completes the calculator's first-step contact form and gives consent, the website's Cloudflare Pages Function sends their lead details through Resend. During the trial, the message is sent to **`serge@mediabeyondvision.com`**. The sender shown on the notification is **SA-BPO Calculator <calculator@notifications.sa-bpo.co.za>**. Replies go to the visitor's company email.

Resend is only the outbound email provider. Microsoft 365 remains responsible for receiving mail for SA-BPO. **Do not remove or replace the existing Microsoft 365 MX records for `sa-bpo.co.za`.** The website's separate estimate-email button still opens a draft addressed to `hello@sa-bpo.co.za`; it does not send that estimate automatically.

> **Important before you start:** The Resend code changes are currently in the working copy and have not been committed or pushed to GitHub. Cloudflare Pages cannot use them until they are pushed to the branch connected to your Pages project. The `RESEND_API_KEY` secret and domain can be configured first, but the live calculator will not use Resend until the updated code is deployed.

## Part 1 — Create your Resend account

1. Go to [Resend](https://resend.com/) and choose **Sign up**. Create the account using an email address you can access.
2. Verify your email address if Resend asks you to. Sign in and open the Resend dashboard.
3. Find the **Domains** section in the dashboard. We will add a sending subdomain there. Resend requires a verified domain before it will send from your own domain.

## Part 2 — Add the sending subdomain in Resend

1. In Resend, open **Domains** and choose **Add Domain**.
2. Enter this exact subdomain:

   `notifications.sa-bpo.co.za`

   This subdomain is for sending calculator notifications. It is separate from the main `sa-bpo.co.za` mailbox domain.
3. If Resend asks for a sending region, select the region you prefer from the options shown. Continue to create the domain.
4. Resend will display the DNS records it needs. Keep this Resend page open. The values are specific to your Resend account, so copy the records shown there exactly; do not use DNS values from someone else's instructions.

## Part 3 — Add Resend's DNS records in Cloudflare

1. Open a second browser tab and sign in to [Cloudflare](https://dash.cloudflare.com/).
2. Select the account that manages SA-BPO's domain, then open the **`sa-bpo.co.za`** website/zone.
3. Open **DNS** → **Records** and choose **Add record**.
4. For each record listed by Resend:
   - Set **Type** to the same type Resend shows, such as TXT, MX, or CNAME.
   - Copy the **Name** exactly. Cloudflare may automatically append `.sa-bpo.co.za`; check the final displayed hostname so the domain is not repeated twice.
   - Copy the **Content/Target/Value** exactly from Resend.
   - For an MX record, copy the priority shown by Resend as well.
   - Leave TTL as **Auto**, unless Resend specifically instructs otherwise.
   - If Cloudflare shows a proxy cloud for a CNAME record, set it to **DNS only**. Mail-authentication records must not be proxied.
5. Save the records. Add only the records Resend lists for `notifications.sa-bpo.co.za`.
6. **Do not change, delete, or replace** the existing root-domain MX records for `sa-bpo.co.za`. Those records route incoming SA-BPO mail to Microsoft 365. Resend's sending records should be for the notification subdomain.
7. Return to Resend's domain page and choose **Verify** (or **Verify DNS Records**). DNS updates can take some time to appear. If verification fails immediately, wait a short while and check the record names and values for typing errors before trying again.
8. Continue only after Resend shows the domain as **Verified**. If Resend asks you to change an existing root MX record or a root SPF record, stop before changing it and ask for help; do not risk interrupting Microsoft 365 mail.

## Part 4 — Create a Resend API key

An API key is a password that lets the website ask Resend to send email.

1. In Resend, open **API Keys**.
2. Choose **Create API Key**.
3. Give the key a recognizable name, for example `SA-BPO Cloudflare Pages trial`.
4. If Resend offers permission choices, choose a sending-only permission and restrict it to `notifications.sa-bpo.co.za` if available. The calculator only needs permission to send email.
5. Create the key and copy it when Resend displays it. Resend does not show the full key again later.
6. Keep the key private. Do not put it in website code, GitHub, a public issue, or a message. The next section explains where to save it securely.

## Part 5 — Save the API key as a Cloudflare Pages secret

1. Sign in to Cloudflare and go to **Workers & Pages**.
2. Select the Pages project that hosts the SA-BPO website.
3. Open **Settings** → **Variables and Secrets**.
4. Choose **Add** (or **Add variable**).
5. Enter the name exactly as shown below:

   `RESEND_API_KEY`

6. Paste the key you copied from Resend into the value field.
7. Select **Encrypt** / **Secret** so Cloudflare stores it as a secret. Do not add it as a plain-text variable.
8. Add it to the **Production** environment. If you will test a Preview deployment first, add the same secret to **Preview** too; the two environments are configured separately.
9. Save the setting. Cloudflare does not display the full secret again after saving, which is expected.

## Part 6 — Push and deploy the updated website code

1. The current code reads the `RESEND_API_KEY` secret and sends the calculator notification to `serge@mediabeyondvision.com` from `calculator@notifications.sa-bpo.co.za`.
2. Push the updated Resend code to the GitHub branch connected to this Cloudflare Pages project. **The Resend code has not been pushed yet.** If you want me to push the changes, tell me to do that.
3. In Cloudflare Pages, open **Deployments** and wait for a deployment containing the Resend code to finish. If the secret was added after the last deployment, trigger a new deployment so the Function receives it.
4. Confirm that the deployment completed successfully before testing the calculator.

## Part 7 — Send a test calculator lead

1. Open the deployed SA-BPO website and open the BPO calculator.
2. Enter test contact details in all required fields and submit the first step with consent. For the trial, the notification goes to **`serge@mediabeyondvision.com`**.
3. If the notification arrives, check that the name, surname, company, position, company email, and telephone number are present and readable. Check the recipient's junk/spam folder too.
4. In Resend, open the **Emails** or **Logs** area and look for the send attempt if no message appears. An accepted API request means Resend accepted the message for processing; it does not guarantee the recipient's mailbox placed it in the inbox.
5. Once Resend accepts the message, the calculator should unlock for the visitor. If email setup is missing or the send fails, the production calculator intentionally does not unlock.

## Common problems

- **Resend says the domain is not verified:** Check that each DNS record's type, name, and value match Resend exactly. Wait for DNS to update, then verify again.
- **The calculator says the email service is not configured:** Confirm the secret is named exactly `RESEND_API_KEY`, is encrypted, is saved to the environment being tested, and the site has been redeployed since it was saved.
- **Resend rejects the sender:** The sender must use the verified subdomain. The current code uses `calculator@notifications.sa-bpo.co.za`; do not change it to a different domain unless that domain is also verified in Resend.
- **Resend accepts the email, but the recipient cannot find it:** Check junk/spam, then inspect the email event in Resend. The recipient's mail security system can still quarantine or reject a message after Resend accepts the request.
- **The API key was lost or exposed:** Create a new key in Resend, replace the Cloudflare Pages secret, redeploy, and revoke the old key in Resend.

## After the trial

When testing is complete, change the fixed recipient constant in `shared/calculator-intake.ts` from `serge@mediabeyondvision.com` to SA-BPO's approved final destination, then commit, push, and redeploy. No Resend domain change is needed just to change the recipient.

## Local development

For local-only tests, set `RESEND_API_KEY` in an ignored `.env` file or in the process environment before running `pnpm dev`. `.env.example` is a template and is not loaded as a credential file. Never commit a real key. Without credentials, the local preview can still be used without sending personal data.

## Official references

- [Resend: Domains](https://resend.com/docs/dashboard/domains/introduction)
- [Resend: API keys](https://resend.com/docs/dashboard/api-keys/introduction)
- [Resend: Send Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Cloudflare Pages Functions: bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare Pages Functions: routing](https://developers.cloudflare.com/pages/functions/routing/)
