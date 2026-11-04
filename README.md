# KubeRocketCI landing

Source of [kuberocketci.io](https://kuberocketci.io), the marketing site of the KubeRocketCI platform. A Next.js App Router project deployed on Vercel.

## Stack

- Next.js 16 with React 19, TypeScript and Tailwind CSS 4
- Two server actions send the contact and demo-request forms through [Resend](https://resend.com); Vercel BotID, a honeypot field, a minimum fill time and a per-IP rate limit guard them
- Google Analytics loads only after cookie consent
- Biome for linting and formatting, Vitest for unit tests

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm lint
pnpm test
pnpm build && pnpm start
pnpm email          # preview the templates in emails/
```

Copy for every page lives in `public/locales/en/common.json`; its shape is typed in `src/types/translations.ts`.

## Configuration

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key used by both forms |
| `CONTACT_EMAIL` | Recipient of contact-form messages, and of demo requests when `DEMO_EMAIL` is unset |
| `DEMO_EMAIL` | Recipient of demo requests |
| `FROM_EMAIL` | Sender address; defaults to Resend's onboarding sender |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement id; analytics stays off without it |

## Deploy

Every push to `main` is deployed by Vercel to kuberocketci.io; pull requests get preview deployments.
