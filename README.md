# SR Builders & Developers — Agent Handoff README

*Last updated: 2026-06-06*

---

## Workspace

Next.js 16 site for SR Builders & Developers, Hyderabad. Flagship project: **Nisarga**.
Working dir: `~/Desktop/AntiGravity/construction-site/`
Live: `srbuildersanddevelopers-k1nt0uns-projects.vercel.app` · Custom domain: `srbuildersanddevelopers.co` (DNS not yet pointed)

---

## Live Status

| Item | Status |
|---|---|
| GitHub | github.com/K1NT0UN/SR-Builders-Developers-website |
| Vercel | ✅ Live, auto-deploys on push to `main` |
| Google Forms | ✅ All 3 recording — Enquiry, Site Visit, Brochure |
| OTP | ✅ Firebase Phone Auth. Test: `9999999999` / `123456` |
| Brochure PDF | ✅ `/public/nisarga-brochure.pdf` — gated behind OTP modal (28MB, updated 2026-06-06) |
| Supabase | oobbgnvmapsanaqbpzvi.supabase.co — `enquiries` + `media_items` tables, `media` bucket public |

---

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **Tailwind CSS v4** — tokens defined in `app/globals.css` via `@theme` (no `tailwind.config.ts`)
- **Framer Motion** — scroll reveals, modals, hover states, Ken Burns hero
- **GSAP + ScrollTrigger** — stat counters (`StatsSection`)
- **Firebase Phone Auth** — OTP for brochure download (invisible reCAPTCHA + `signInWithPhoneNumber`)
- **Supabase** — lead storage + media (`@supabase/ssr`)
- **Google Forms** — lead capture via server-side proxy `/api/lead`; fetches real `fbzx` token + session fields to record responses

---

## Brand

| Token | Value | Usage |
|---|---|---|
| `forest` | `#1a3320` | Footer, full-bleed sections, nav |
| `gold` | `#c8a951` | CTAs, underlines, accents |
| `parchment` | `#faf7f0` | Page bg, navbar, content sections |
| `linen` | `#ede0c8` | Alternating sections |
| `forest-dark` | `#112216` | Hover states, mobile menu |

Fonts: **Oswald** (`font-serif`) headings · **Barlow** (`font-sans`) body. Never cool grey.

---

## Contact & Addresses

- **Phone:** +91 94922 39339 / +91 99899 90256
- **Email:** srbuildersnisarga@gmail.com
- **WhatsApp:** wa.me/919989990256

**Corporate Office:** 4th Floor, C1 Block, Vaishnavi Symbol, Financial District, Nanakramguda, Hyderabad – 500032 · [Maps](https://maps.app.goo.gl/4gPbrXw7e8HQVVpS8)

**Nisarga Site Office:** F6RX+574, Patancheruvu, Hyderabad, Telangana – 502300 · [Maps](https://maps.app.goo.gl/n3kFgFqyRdASwSuc6)

**RERA:** P01100010902 (T.S. RERA) · CREDAI Member

---

## File Structure

```
construction-site/
├── app/
│   ├── globals.css              ← Brand tokens + fonts
│   ├── layout.tsx               ← Root: Navbar + Footer + FloatingWhatsApp
│   ├── page.tsx                 ← Homepage
│   ├── about/page.tsx           ← Mission, strengths, leadership
│   ├── projects/
│   │   ├── page.tsx             ← Tabs: Current / Pipeline / Completed
│   │   └── nisarga/page.tsx     ← Renders NisargaPageContent
│   ├── enquire/page.tsx         ← Enquiry + Site Visit forms + 4-col contact strip
│   └── api/lead/route.ts        ← Server-side proxy for all 3 Google Forms
├── components/
│   ├── Navbar.tsx / Footer.tsx / FloatingWhatsApp.tsx
│   ├── StatsSection.tsx         ← GSAP counters
│   ├── FadeInView.tsx           ← Framer Motion scroll reveal wrapper
│   ├── NisargaPageContent.tsx   ← Full Nisarga page (11 sections)
│   ├── NisargaHeroCarousel.tsx  ← Ken Burns carousel; CTAs: Download Brochure · Book a Site Visit
│   ├── NisargaOverviewLightbox.tsx / NisargaLandscapeGallery.tsx
│   ├── ProjectsTabs.tsx         ← Current/Pipeline/Completed tabs + BrochureButton
│   ├── EnquireForms.tsx         ← Tab switcher: Enquiry / Site Visit. Reads #site-visit hash.
│   ├── LeadForm.tsx             ← Name + Mobile + Email + optional dates (site visit)
│   └── BrochureButton.tsx       ← OTP modal → Firebase verify → submitBrochure → PDF download
├── lib/
│   ├── projects.ts              ← All project data
│   ├── otp.ts                   ← sendOtp / verifyOtp / resetOtp — Firebase Phone Auth
│   ├── submitForm.ts            ← submitEnquiry / submitSiteVisit / submitBrochure (all → /api/lead)
│   ├── firebase.ts              ← Firebase auth instance
│   └── supabase/client.ts + server.ts
├── public/
│   ├── nisarga-brochure.pdf     ← 16MB brochure
│   └── images/                 ← logos, Nisarga renders
└── supabase/migrations/
```

---

## Pages Built

| Page | Notes |
|---|---|
| `/` | Homepage — Nisarga hero + contact strip |
| `/projects/nisarga` | Full Nisarga landing page |
| `/about` | Mission, strengths, leadership (initials — photos pending) |
| `/projects` | Tabs: Current (Nisarga) · Pipeline (5) · Completed (24 placeholders) |
| `/enquire` | Enquiry + Site Visit forms, 4-col contact strip |

---

## Lead Capture Flow

All forms go through `/api/lead` → Google Forms (personal Gmail account — workspace accounts blocked submissions).

| Form | OTP? | Fields | Google Form ID |
|---|---|---|---|
| Enquiry | ❌ | name, mobile, email | `1FAIpQLSdhs…umn2Qw` |
| Site Visit | ❌ | name, mobile, email, date1, date2 | `1FAIpQLScJ74…RJuw` |
| Brochure Download | ✅ Firebase | name, mobile, email | `1FAIpQLSfmvwb…ibgw` |

**Important:** All Google Forms must be created from a **personal Gmail account**. Workspace/company accounts silently reject server-side form POSTs due to org-level restrictions even when "Collect email addresses" is off.

---

## OTP — Firebase Phone Auth

- `lib/otp.ts` — `sendOtp(e164Phone)` / `verifyOtp(code)` / `resetOtp()`
- Invisible reCAPTCHA: `<div id="recaptcha-container" />` in `BrochureButton.tsx`
- Firebase env vars: `NEXT_PUBLIC_FIREBASE_*` in `.env.local` + Vercel
- **Test:** phone `+919999999999` · OTP `123456`
- Currently used only for brochure download. Plan to add MSG91 as primary after DLT verification (see To-Do).

---

## Lighthouse Scores (2026-06-06)

| Category | Score |
|---|---|
| 🔴 Performance | 45/100 |
| 🟢 Accessibility | 95/100 |
| 🟢 Best Practices | 96/100 |
| 🟢 SEO | 91/100 |

**Performance bottlenecks:** LCP 10.5s · TTI 12.5s · TBT 910ms
**Top fixes:** hero image `priority` prop · lazy-load Framer Motion on non-hero sections · compress/resize hero images

---

## What Still Needs To Be Done

1. **Improve site performance** — Lighthouse performance score is 45/100. Key fixes: add `priority` to hero images, lazy-load heavy animations, compress hero images. Target: 75+.
2. **Add MSG91 OTP** — After DLT registration is complete (~₹5,000 one-time, 2–5 days). Switch brochure OTP from Firebase to MSG91 for Indian carrier reliability. Keep Firebase as fallback.
3. **Completed project photos** — Add `image` per project in `lib/projects.ts`; drop files in `public/images/completed/`
4. **Leadership photos** — Update `app/about/page.tsx` when ready
5. **Highrise Apartments final name** — Update `lib/projects.ts`; build `/projects/highrise` page
6. **Connect GoDaddy domain** — Vercel dashboard → add domain → GoDaddy DNS: A record `76.76.21.21` + CNAME `cname.vercel-dns.com`

---

## Infrastructure Costs (~200 users/month)

| Service | Cost |
|---|---|
| Vercel Pro | $20/month |
| Supabase | Free |
| Firebase Auth | Free (Spark plan) |
| MSG91 (after DLT) | ~₹100/month |
| GoDaddy domain protection | ₹150/month |
| Domain renewal (from June 2029) | ₹5,500/year |
| **Total** | **~$22/month + ₹250** |

---

## Key Files on Desktop

| Path | Contents |
|---|---|
| `~/Desktop/SRSM Profile/SR B & D Logo/` | Logo source PNG (2000×1545) |
| `~/Desktop/Nisarga_Brochure_32 in x 12 in_Final_3mm bleed_05-06-26.pdf` | Full Nisarga brochure (28MB) — swapped 2026-06-06 |
| `~/Desktop/Nisarga_Project_Website_Assets/` | Extracted brochure images |
| `~/Desktop/Nisarga_Project_Website_Assets/Website_Content_References/website_copy.md` | Verified Nisarga copy |
| `~/Desktop/AntiGravity/SR-Builders-Hosting-Pitch.html` | Hosting & maintenance pitch |
