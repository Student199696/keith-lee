# Keith Lee Partnership Platform

An executive partnership website for restaurant groups, hospitality brands, agencies, tourism organizations, and event producers seeking to work with Keith Lee.

The project is a Next.js 16 application with two supported build targets:

- Vercel for the user-managed GitHub/Vercel deployment.
- Cloudflare Sites/Vinext for the existing managed Site.

## Included

- Premium responsive partnership website and reusable design system.
- Four-step qualified partnership inquiry flow.
- Transactional email delivery to the partnerships team.
- Branded confirmation email and on-screen receipt for each submitter.
- File attachments for briefs, menus, decks, or venue information.
- Public five-page downloadable media kit.
- Optional D1/R2 inquiry persistence when deployed through Sites.
- GitHub Actions build verification and Vercel configuration.

## Local setup

Requirements: Node.js 22.13 or newer and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open the loopback URL printed by the development server.

## Email configuration

The inquiry endpoint uses Resend's HTTPS email API. Create an account, verify the domain used by the sender address, and add these values to `.env.local` and to the Vercel project's environment variables:

```dotenv
RESEND_API_KEY=re_xxxxxxxxx
PARTNERSHIP_FROM_EMAIL=Keith Lee Partnerships <partnerships@your-verified-domain.com>
PARTNERSHIP_TO_EMAIL=abdulbaasitisah436@gmail.com
```

`PARTNERSHIP_TO_EMAIL` is the internal destination. Change it later without changing application code. `PARTNERSHIP_FROM_EMAIL` must use a domain that the Resend account is permitted to send from. Never commit a real API key.

Each valid submission triggers two messages:

1. A complete internal inquiry summary, with submitted files attached, sent to `PARTNERSHIP_TO_EMAIL`.
2. A branded acknowledgement with a unique reference number, sent to the submitter's work email.

The Vercel deployment uses email as the inquiry system of record. The Sites deployment also persists inquiries and uploaded files when the declared D1 and R2 bindings are available.

## Build verification

```bash
# Vercel / standard Next.js build
npm run build:vercel

# Existing Sites / Vinext build
npm run build
```

The Vercel-specific build creates a standard `.next` output and aliases the Cloudflare runtime binding for portability. No live email is sent during either build.

## Push to your GitHub account

Create a new empty repository in the GitHub account you want to use, then run the following from this directory:

```bash
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

This checkout may retain a `sites` remote for the existing managed Site. It can remain alongside your new `origin`. If an `origin` already exists, update it with `git remote set-url origin ...` instead.

## Deploy to Vercel

1. In Vercel, import the new GitHub repository.
2. Keep the detected framework as Next.js. The included `vercel.json` selects `npm run build:vercel`.
3. Add `RESEND_API_KEY`, `PARTNERSHIP_FROM_EMAIL`, and `PARTNERSHIP_TO_EMAIL` for Production, Preview, and Development as appropriate.
4. Deploy and submit one controlled test inquiry.
5. Confirm that the internal notification, applicant confirmation, attachments, reply-to address, and unique reference all arrive correctly.

Vercel will redeploy automatically after later pushes to the connected production branch.

## Media kit

The downloadable website asset is at `public/downloads/keith-lee-partnership-media-kit.pdf`. Regenerate both the source artifact and public copy with:

```bash
python3 scripts/generate-media-kit.py
```

Review and approve all biographies, images, trademarks, audience claims, testimonials, and performance claims before public launch. The current public kit intentionally avoids unverified reach or revenue figures.

## Operational safeguards

- Accepted uploads: PDF, Word, JPG, PNG, and WebP.
- Maximum: three files and 4 MB total per inquiry.
- Required consent and server-side field validation.
- HTML-escaped user content in both email templates.
- No public pricing or implied guaranteed outcome.
- Availability and scope are confirmed only in a written proposal or agreement.

Before a production launch, configure Resend's account-level security, sender-domain DNS records, and delivery monitoring. Add a dedicated CRM or database if the Vercel deployment needs long-term reporting beyond delivered email records.
