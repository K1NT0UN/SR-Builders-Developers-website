# SR Builders & Developers — Agent Handoff README

*Last updated: 2026-06-02*

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
| Working tree | Clean, synced to `origin/main` |

---

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **Tailwind CSS v4** — CSS-based config in `app/globals.css` (no `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, tab transitions, hover lift, Ken Burns hero, WhatsApp button
- **GSAP + ScrollTrigger** — stat counters (`StatsSection`)
- **Supabase** — enquiry form submissions and CMS media (`@supabase/ssr`)
- **MSG91** — server-side OTP SMS verification for lead forms

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
│   ├── globals.css              ← Brand colors + fonts (Tailwind v4 @theme)
│   ├── layout.tsx               ← Root layout, Oswald + Barlow, Navbar + Footer + FloatingWhatsApp, site metadata
│   ├── page.tsx                 ← Homepage — Nisarga content + inline contact strip
│   ├── about/page.tsx           ← About + Leadership (fresh voice, distinct from SRSM site)
│   ├── projects/
│   │   ├── page.tsx             ← Projects tabs (current / pipeline / completed)
│   │   └── nisarga/page.tsx     ← Renders NisargaPageContent
│   └── enquire/page.tsx         ← Enquiry + site visit forms → Supabase
├── components/
│   ├── Navbar.tsx               ← Parchment bg, forest links, dark logo
│   ├── Footer.tsx               ← Forest bg, light logo, entities
│   ├── FloatingWhatsApp.tsx     ← Floating WhatsApp button (Framer Motion)
│   ├── StatsSection.tsx         ← GSAP counters
│   ├── FadeInView.tsx           ← Framer Motion scroll reveal
│   ├── NisargaPageContent.tsx   ← Full Nisarga page JSX
│   ├── NisargaHeroCarousel.tsx  ← Ken Burns hero carousel
│   ├── NisargaOverviewLightbox.tsx ← Aerial + masterplan lightbox
│   ├── NisargaLandscapeGallery.tsx ← Grid gallery, tab selector
│   ├── ProjectsTabs.tsx         ← Tab switching, hover animations, brochure buttons
│   └── EnquireClient.tsx        ← Supabase form submission
├── lib/
│   ├── projects.ts              ← All project data
│   └── supabase/client.ts + server.ts
├── public/images/
│   ├── sr-builders-logo.png
│   ├── sr-builders-logo-light.png
│   └── nisarga/                 ← Brochure renders (9 heavy JPEGs swapped to WebP, ~29 MB saved)
└── supabase/migrations/001_enquiries.sql
```

> Note: the previously orphaned `HeroSection.tsx` was deleted (commit f512794). It no longer exists.

---

## What's Been Built

### Pages
- ✅ **Homepage (`/`)** — Nisarga content + inline contact strip. Navbar/footer present.
- ✅ **`/projects/nisarga`** — Same Nisarga content via shared `NisargaPageContent`
- ✅ **About** — Mission, history, core strengths, entities, Leadership (fresh copy, distinct voice from SRSM site)
- ✅ **Projects** — Tabs: Current (Nisarga) + Pipeline + Completed (24). Hover animations, brochure buttons, and photo placeholders on completed tiles.
- ✅ **Enquire** — Quick enquiry + site visit forms → Supabase `enquiries` table + MSG91 OTP verification
- ✅ **WhatsApp** — Floating button + inline contact strip, shipped (commit 586fdef)

### Group Entities (3 active)
1. SR Builders and Developers — Residential & Villas
2. SM Builders — Residential & Commercial
3. SM Builders and Developers — Residential

### Projects Data (`lib/projects.ts`)
**Current:** Nisarga Villas (integrated township, ongoing, 2028)
**Pipeline:** Highrise Apartments (Kollur, **name TBD**, 2030) · Borampet Villas · Bashirbag Commercial · Chandanagar Commercial · Lingampally Residences
**Completed:** 24 projects across SR Builders, SM Builders, SM Builders & Developers, SM Projects, SM Constructions, SM Infra Developers (photo placeholders added)

---

## What Still Needs To Be Done

1. **Highrise Apartments — final name** — `lib/projects.ts`; "Name TBD" badge shows until updated.
2. **Leadership photos** — placeholder initials circles; upload real photos + update `app/about/page.tsx` when ready.
3. **Highrise dedicated page** — `/projects/highrise`, once brand name is decided.
4. **Connect custom GoDaddy domain** — site is live on Vercel default domain; point the purchased GoDaddy domain at it.

---

## Supabase

- **URL:** `https://oobbgnvmapsanaqbpzvi.supabase.co`
- **Anon key:** in `.env.local` (gitignored + set in Vercel env vars — never committed)
- **Tables live:** `enquiries`, `media_items`
- **Storage:** `media` bucket is created and public (for team photos + future media)

---

## Key Content Files on Desktop

| Path | Contents |
|---|---|
| `~/Desktop/SRSM Profile/SR B & D Logo/SR Builders Logo_pdf.pdf.png` | Logo source (2000x1545 PNG) |
| `~/Desktop/SRSM Profile/Nisarga_Brochure_APRL_21_26_.pdf` | Full Nisarga brochure (31 pages) |
| `~/Desktop/Nisarga_Project_Website_Assets/` | All extracted brochure images |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/website_copy.md` | Verified Nisarga website copy |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/IMAGE_REFERENCE_MAP.txt` | Brochure page → image mapping |
