# SR Builders & Developers — Agent Handoff README

*Last updated: 2026-06-06*

---

## Workspace

Next.js 16 site for SR Builders & Developers, Hyderabad. Flagship project: **Nisarga**.
Working dir: `~/Desktop/AntiGravity/construction-site/`
Group site (separate repo): `~/Desktop/AntiGravity/srsm-group-website/`

---

## Live Status

| Item | Status |
|---|---|
| GitHub | github.com/K1NT0UN/SR-Builders-Developers-website |
| Vercel | Live, auto-deploys on push to `main`. Custom domain not yet connected. |
| Supabase | oobbgnvmapsanaqbpzvi.supabase.co — `enquiries` + `media_items` tables live, `media` bucket public |
| Google Forms | ✅ All 3 recording — Enquiry, Site Visit, Brochure |
| OTP | ✅ Firebase Phone Auth — fully working. Test: phone `9999999999`, OTP `123456` |
| Brochure PDF | ✅ `/public/nisarga-brochure.pdf` — served as static asset |
| Working tree | Clean, synced to `origin/main` |

---

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **Tailwind CSS v4** — CSS config in `app/globals.css` via `@theme` (no `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, modals, hover, Ken Burns hero
- **GSAP + ScrollTrigger** — stat counters (`StatsSection`)
- **Supabase** — lead storage + media (`@supabase/ssr`)
- **Firebase Phone Auth** — OTP for brochure download (invisible reCAPTCHA, `signInWithPhoneNumber`)
- **Google Forms** — lead capture (server-side proxy via `/api/lead`); session fields (`fbzx`, `fvv`, etc.) required for responses to record

---

## Brand

| Token | Value | Usage |
|---|---|---|
| `forest` | `#1a3320` | Footer, full-bleed sections, nav |
| `gold` | `#c8a951` | CTAs, underlines, accents |
| `parchment` | `#faf7f0` | Page bg, navbar, content sections |
| `linen` | `#ede0c8` | Alternating sections |
| `forest-dark` | `#112216` | Hover states, mobile menu |

Fonts: **Oswald** (`font-serif`) headings + **Barlow** (`font-sans`) body. Never cool grey.

---

## Contact & Addresses

- **Phone:** +91 94922 39339 / +91 99899 90256
- **Email:** srbuildersnisarga@gmail.com / sr.sm.group.buildersanddevelopers@gmail.com
- **WhatsApp:** wa.me/919989990256

**Corporate Office:** 4th Floor, C1 Block, Vaishnavi Symbol, Financial District, Nanakramguda, Hyderabad – 500032
[Maps](https://maps.app.goo.gl/4gPbrXw7e8HQVVpS8)

**Nisarga Site Office:** F6RX+574, Patancheruvu, Hyderabad, Telangana – 502300
[Maps](https://maps.app.goo.gl/n3kFgFqyRdASwSuc6)

**RERA:** P01100010902 (T.S. RERA) · CREDAI Member

---

## File Structure

```
construction-site/
├── app/
│   ├── globals.css              ← Brand tokens + fonts
│   ├── layout.tsx               ← Root: Navbar + Footer + FloatingWhatsApp
│   ├── page.tsx                 ← Homepage
│   ├── about/page.tsx           ← Mission, strengths, entities, leadership
│   ├── projects/
│   │   ├── page.tsx             ← Tabs: Current / Pipeline / Completed
│   │   └── nisarga/page.tsx     ← Renders NisargaPageContent
│   ├── enquire/page.tsx         ← Enquiry + Site Visit forms, 4-col contact strip
│   └── api/lead/route.ts        ← Server-side proxy for all 3 Google Forms (fetches fbzx, appends session fields)
├── components/
│   ├── Navbar.tsx / Footer.tsx / FloatingWhatsApp.tsx
│   ├── StatsSection.tsx         ← GSAP counters
│   ├── FadeInView.tsx           ← Framer Motion scroll reveal wrapper
│   ├── NisargaPageContent.tsx   ← Full Nisarga page (11 sections)
│   ├── NisargaHeroCarousel.tsx  ← Ken Burns carousel; CTAs: Download Brochure (gold) · Explore Villas · Book a Site Visit
│   ├── NisargaOverviewLightbox.tsx / NisargaLandscapeGallery.tsx
│   ├── ProjectsTabs.tsx         ← Current/Pipeline/Completed tabs + BrochureButton
│   ├── EnquireForms.tsx         ← Tab switcher: Enquiry / Site Visit
│   ├── LeadForm.tsx             ← Name + Mobile + Email (+ date fields for site visit). No OTP.
│   ├── BrochureButton.tsx       ← Gold modal: Name + Mobile + Email → Firebase OTP → download + Google Form log
│   └── EnquireClient.tsx        ← Legacy (kept for reference)
├── lib/
│   ├── projects.ts              ← All project data. Nisarga has brochureUrl set.
│   ├── leadConfig.ts            ← Google Form URLs + entry IDs (all 3 wired). otpEnabled = true.
│   ├── otp.ts                   ← sendOtp / verifyOtp — Firebase Phone Auth (RecaptchaVerifier + signInWithPhoneNumber)
│   ├── submitForm.ts            ← submitEnquiry / submitSiteVisit / submitBrochure helpers (all POST to /api/lead)
│   ├── firebase.ts              ← Firebase init (auth instance used by otp.ts)
│   └── supabase/client.ts + server.ts
├── public/
│   ├── nisarga-brochure.pdf     ← 16MB — gated behind OTP modal
│   └── images/                 ← logos, nisarga renders
└── supabase/migrations/
    ├── 001_enquiries.sql
    └── 002_media_items.sql
```

---

## Pages Built

| Page | Status | Notes |
|---|---|---|
| `/` | ✅ | Homepage — Nisarga hero + contact strip |
| `/projects/nisarga` | ✅ | Full landing page via NisargaPageContent |
| `/about` | ✅ | Mission, strengths, entities, leadership (initials — awaiting photos) |
| `/projects` | ✅ | Tabs: Current (Nisarga) + Pipeline (5) + Completed (24 placeholders) |
| `/enquire` | ✅ | Enquiry + Site Visit forms, 4-col contact strip (corporate + site office + phone + email) |

---

## Lead Capture Flow

| Form | OTP? | Destination | Status |
|---|---|---|---|
| Enquiry | ❌ | Google Sheet via `submitEnquiry` | ✅ Recording |
| Site Visit | ❌ | Google Sheet via `submitSiteVisit` (name, mobile, email) | ✅ Recording |
| Brochure Download | ✅ Firebase | Google Sheet via `submitBrochure` + PDF auto-downloads | ✅ Recording |

---

## OTP — Firebase Phone Auth ✅

Switched from MSG91 to Firebase Phone Auth. MSG91 was blocked at carrier level (DLT not registered).

- `lib/otp.ts` — `sendOtp(e164Phone)` / `verifyOtp(code)` / `resetOtp()`
- Uses `RecaptchaVerifier` (invisible) + `signInWithPhoneNumber`
- reCAPTCHA container: `<div id="recaptcha-container" />` in `BrochureButton.tsx`
- **Test credentials:** phone `+919999999999` · OTP `123456`
- Firebase project env vars: `NEXT_PUBLIC_FIREBASE_*` in `.env.local` + Vercel


---

## What Still Needs To Be Done

1. **Completed project photos** — Add `image` field per project in `lib/projects.ts`; drop files in `public/images/completed/`
3. **Leadership photos** — ~1 week. Update `app/about/page.tsx` when ready
4. **Highrise Apartments final name** — ~2 weeks. Update `lib/projects.ts`; add `/projects/highrise` page
5. **Connect GoDaddy domain** — Add domain in Vercel dashboard → A record `76.76.21.21` + CNAME `cname.vercel-dns.com` in GoDaddy DNS

---

## Infrastructure Costs (~200 users/month)

| Service | Cost |
|---|---|
| Vercel Pro | $20/month (required for commercial use) |
| Supabase | Free |
| Firebase Auth | Free (Spark plan, well within limits) |
| GoDaddy domain protection | ₹150/month |
| Domain renewal (from June 2029) | ₹5,500/year |
| **Total** | **~$22/month + ₹250** |

---

## Key Files on Desktop

| Path | Contents |
|---|---|
| `~/Desktop/SRSM Profile/SR B & D Logo/` | Logo source PNG (2000×1545) |
| `~/Desktop/Nisarga_Brochure_APRL_21_26_.pdf` | Full Nisarga brochure (image-based PDF, 16MB) |
| `~/Desktop/Nisarga_Project_Website_Assets/` | Extracted brochure images |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/website_copy.md` | Verified Nisarga copy |
| `~/Desktop/AntiGravity/SR-Builders-Hosting-Pitch.html` | Hosting & maintenance pitch (open in Chrome → Print → Save as PDF) |
