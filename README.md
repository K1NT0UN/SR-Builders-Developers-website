# SR Builders & Developers — Agent Handoff README

*Last updated: 2026-06-04*

---

## What This Workspace Is

The **SR Builders and Developers website** — a Next.js 16 site for the Hyderabad-based construction and real estate company, flagship project **Nisarga**. Working directory: `~/Desktop/AntiGravity/construction-site/`.

The parent group site lives separately at `~/Desktop/AntiGravity/srsm-group-website/`.

---

## Live Status

| Item | Status |
|---|---|
| GitHub repo | github.com/K1NT0UN/SR-Builders-Developers-website |
| Vercel deployment | Live on Vercel default domain — auto-deploys on push to `main`. Custom GoDaddy domain not yet connected. |
| Supabase project | oobbgnvmapsanaqbpzvi.supabase.co |
| Supabase `enquiries` table | ✅ Created and live |
| Supabase `media_items` table | ✅ Created and live |
| Supabase `media` bucket | ✅ Created, public |
| MSG91 OTP | ✅ Integrated (server-side API routes). Vercel env vars still need to be added. |
| Working tree | Clean, synced to `origin/main` |

---

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **Tailwind CSS v4** — CSS-based config in `app/globals.css` (no `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, tab transitions, hover lift, Ken Burns hero, WhatsApp button
- **GSAP + ScrollTrigger** — stat counters (`StatsSection`)
- **Supabase** — enquiry form submissions and CMS image storage (`@supabase/ssr`)
- **MSG91** — server-side OTP SMS verification for brochure downloads

Read `CLAUDE.md` at workspace root and `AGENTS.md` before editing.

---

## Brand / Design System

Defined in `app/globals.css` via `@theme`:

| Token | Value | Usage |
|---|---|---|
| `forest` | `#1a3320` | Footer, full-bleed sections, nav links |
| `gold` | `#c8a951` | All CTAs, underlines, icon tints, hover |
| `parchment` | `#faf7f0` | Navbar background, page background, content sections |
| `linen` | `#ede0c8` | Alternating sections |
| `forest-dark` | `#112216` | Hover states, mobile menu bg |

**Fonts:** Oswald (headings via `font-serif`) + Barlow (body via `font-sans`)
**Rule:** Never use cool grey. Brand is entirely warm-toned.
**Navbar:** Parchment background, dark logo (`sr-builders-logo.png`). Mobile menu is forest-dark.

---

## Contact

- **Phone:** `+91 94922 39339` / `+91 99899 90256`
- **Email:** `srbuildersnisarga@gmail.com` / `sr.sm.group.buildersanddevelopers@gmail.com`
- **WhatsApp:** `wa.me/919989990256` (floating button + inline contact strip)

---

## Logo Files

In `public/images/`:

| File | Usage | Notes |
|---|---|---|
| `sr-builders-logo.png` | Navbar, light backgrounds | Dark maroon mark + dark charcoal text, transparent bg |
| `sr-builders-logo-light.png` | Footer, dark backgrounds | Dark maroon mark + parchment text, transparent bg |

Source: `~/Desktop/SRSM Profile/SR B & D Logo/SR Builders Logo_pdf.pdf.png` (2000x1545, horizontal).

---

## File Structure

```
construction-site/
├── app/
│   ├── globals.css                  ← Brand colors + fonts (Tailwind v4 @theme)
│   ├── layout.tsx                   ← Root layout, Oswald + Barlow, Navbar + Footer + FloatingWhatsApp
│   ├── page.tsx                     ← Homepage — Nisarga content + inline contact strip
│   ├── about/page.tsx               ← About + Leadership (order: Vasu, Jagan, Rabani, Radha Krishna, Yashwanth)
│   ├── projects/
│   │   ├── page.tsx                 ← Projects tabs (current / pipeline / completed with photo placeholders)
│   │   └── nisarga/page.tsx         ← Renders NisargaPageContent
│   ├── enquire/page.tsx             ← Enquiry + site visit forms (no OTP) + contact info
│   └── api/
│       └── otp/
│           ├── send/route.ts        ← Server-side MSG91 send OTP API
│           └── verify/route.ts      ← Server-side MSG91 verify OTP API
├── components/
│   ├── Navbar.tsx                   ← Parchment bg, forest links, dark logo
│   ├── Footer.tsx                   ← Forest bg, light logo, entities
│   ├── FloatingWhatsApp.tsx         ← Floating WhatsApp button (Framer Motion)
│   ├── StatsSection.tsx             ← GSAP counters
│   ├── FadeInView.tsx               ← Framer Motion scroll reveal
│   ├── NisargaPageContent.tsx       ← Full Nisarga page JSX (11 sections)
│   ├── NisargaHeroCarousel.tsx      ← Ken Burns hero carousel
│   ├── NisargaOverviewLightbox.tsx  ← Aerial + masterplan lightbox
│   ├── NisargaLandscapeGallery.tsx  ← Grid gallery, tab selector
│   ├── ProjectsTabs.tsx             ← Tab switching, hover animations, brochure buttons
│   ├── EnquireForms.tsx             ← Tab switcher for Enquiry / Site Visit forms
│   ├── LeadForm.tsx                 ← Shared form UI (name, mobile, email — no OTP for enquiry/site visit)
│   ├── BrochureButton.tsx           ← Gated brochure modal — requires MSG91 OTP to unlock download
│   └── EnquireClient.tsx            ← Legacy Supabase form (kept for reference)
├── lib/
│   ├── projects.ts                  ← All project data (current / pipeline / completed)
│   ├── firebase.ts                  ← Firebase app init (gracefully disabled if no API key)
│   ├── leadConfig.ts                ← MSG91 config + Google Form URLs (PASTE FORM URLs HERE)
│   ├── otp.ts                       ← sendOtp / verifyOtp — calls /api/otp/* routes (MSG91)
│   ├── submitForm.ts                ← Submits lead data to Google Forms (no-cors)
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── public/images/
│   ├── sr-builders-logo.png
│   ├── sr-builders-logo-light.png
│   └── nisarga/                     ← Brochure renders (WebP, ~29 MB saved vs JPEG)
└── supabase/migrations/
    ├── 001_enquiries.sql
    └── 002_media_items.sql
```

---

## What's Been Built

### Pages
- ✅ **Homepage (`/`)** — Nisarga content + inline contact strip. Navbar/footer present.
- ✅ **`/projects/nisarga`** — Full Nisarga landing page via shared `NisargaPageContent`
- ✅ **About** — Mission, history, core strengths, entities, Leadership (order: Vasu, Jagan, Rabani, Radha Krishna, Yashwanth)
- ✅ **Projects** — Tabs: Current (Nisarga only) + Pipeline + Completed (24, with image placeholder tiles)
- ✅ **Enquire** — Quick Enquiry + Site Visit forms (no OTP required) with contact info strip
- ✅ **Brochure Download** — OTP-gated via MSG91 (`BrochureButton.tsx`)
- ✅ **WhatsApp** — Floating button + inline contact strip

### Group Entities (3 active)
1. SR Builders and Developers — Residential & Villas
2. SM Builders — Residential & Commercial
3. SM Builders and Developers — Residential

### Projects Data (`lib/projects.ts`)
**Current:** Nisarga Villas (integrated township, ongoing, 2028)
**Pipeline:** Highrise Apartments (Kollur, **name TBD**, 2030) · Borampet Villas · Bashirbag Commercial · Chandanagar Commercial · Lingampally Residences
**Completed:** 24 projects across SR Builders, SM Builders, SM Builders & Developers, SM Projects, SM Constructions, SM Infra Developers (photo placeholder tiles live)

---

## What Still Needs To Be Done

1. **Google Form URLs** — `lib/leadConfig.ts` still has placeholder URLs (`PASTE_ENQUIRY_FORM_RESPONSE_URL` etc.). Create 3 Google Forms (Enquiry, Site Visit, Brochure) and paste their `/formResponse` URLs + `entry.XXXXX` field IDs into `leadConfig.ts`.
2. **MSG91 Vercel env vars** — Add `MSG91_AUTH_KEY` and `MSG91_TEMPLATE_ID` in Vercel → Project → Settings → Environment Variables, then trigger a redeploy.
3. **Site visit email notification** — In the Site Visit Google Form, go to Responses → ⋮ → "Get email notifications for new responses" to receive instant alerts.
4. **Completed project photos** — Add `image: '/images/completed/filename.jpg'` per project in `lib/projects.ts`; drop files in `public/images/completed/`.
5. **Leadership photos** — Placeholder initials circles; upload real photos + update `app/about/page.tsx` when ready (expected in ~1 week).
6. **Highrise Apartments — final name** — `lib/projects.ts`; "Name TBD" badge shows until updated (expected in ~2 weeks).
7. **Highrise dedicated page** — `/projects/highrise`, once brand name is decided.
8. **Connect custom GoDaddy domain** — Add domain in Vercel dashboard, then add A record `76.76.21.21` and CNAME `cname.vercel-dns.com` in GoDaddy DNS.

---

## Supabase

- **URL:** `https://oobbgnvmapsanaqbpzvi.supabase.co`
- **Anon key:** in `.env.local` (gitignored + set in Vercel env vars — never committed)
- **Tables live:** `enquiries`, `media_items`
- **Storage:** `media` bucket is created and public (for team photos + completed project images)

---

## MSG91

- **Auth Key:** in `.env.local` as `MSG91_AUTH_KEY` (also set this in Vercel env vars)
- **Template ID:** in `.env.local` as `MSG91_TEMPLATE_ID`
- **Template message:** `Your OTP for SR Builders and Developers is ##OTP##. Please do not share this with anyone.`
- **Used in:** `BrochureButton.tsx` only — Enquiry and Site Visit forms do NOT require OTP.

---

## Key Content Files on Desktop

| Path | Contents |
|---|---|
| `~/Desktop/SRSM Profile/SR B & D Logo/SR Builders Logo_pdf.pdf.png` | Logo source (2000x1545 PNG) |
| `~/Desktop/SRSM Profile/Nisarga_Brochure_APRL_21_26_.pdf` | Full Nisarga brochure (31 pages) |
| `~/Desktop/Nisarga_Project_Website_Assets/` | All extracted brochure images |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/website_copy.md` | Verified Nisarga website copy |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/IMAGE_REFERENCE_MAP.txt` | Brochure page → image mapping |
