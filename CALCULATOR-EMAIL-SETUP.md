# BPO calculator email setup

The calculator sends validated access-request details to `outsourcing@sa-bpo.co.za` through the existing SA-BPO mailbox using server-side SMTP. SMTP credentials are read only from the server environment; do not put them in client code or commit them to Git.

## Environment variables

Copy the blank keys from `.env.example` into the private environment/secrets manager for the deployed application:

| Variable | Purpose |
|---|---|
| `SMTP_HOST` | SMTP server hostname supplied by the mailbox provider |
| `SMTP_PORT` | Usually `587` for STARTTLS or `465` for implicit TLS |
| `SMTP_SECURE` | `false` for port 587; `true` for implicit TLS (port 465) |
| `SMTP_USER` | SMTP mailbox/login username |
| `SMTP_PASS` | Mailbox app password or SMTP password |
| `SMTP_FROM` | Optional permitted sender address; defaults to `SMTP_USER` |
| `TRUST_PROXY` | Leave `false` unless the app runs behind a trusted proxy that supplies the client IP |

Use the SMTP host and authentication method provided by SA-BPO's mailbox administrator. Keep the values in the deployment's secret manager, not in `.env.example` or source control.

## Runtime behavior

- In production, the calculator only grants access after the server successfully emails the validated lead to `outsourcing@sa-bpo.co.za`.
- Until valid SMTP settings are present, production returns a safe error and does not unlock the calculator.
- In the development preview only, missing SMTP produces an explicit **Preview only** notice and lets you inspect the calculator without emailing personal data.
- After calculating, **Compose estimate email** opens the visitor's mail app with the estimate addressed to `hello@sa-bpo.co.za`. The visitor reviews and sends that email themselves.

Deploy the server runtime along with the frontend (`pnpm build`, then `pnpm start`); a static-only host cannot run the SMTP endpoint.
