// ─────────────────────────────────────────────────────────────────────────────
// Lead-capture configuration: MSG91 OTP + Google Forms.
//
// Google Form action URLs + field entry IDs are wired below.
// These are NOT secret — they live in the page source either way.
// ─────────────────────────────────────────────────────────────────────────────

// Default country code for the mobile field.
export const COUNTRY_CODE = '+91'

// ── Enquiry Form ──────────────────────────────────────────────────────────────
// Fields: Name, Mobile, Email
export const enquiryForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdpMFwF3FozoJTsYJhhiD5rYM0c1HCWsdEY_pi-3hs80V9APQ/formResponse',
  fields: {
    name: 'entry.1069233328',
    mobile: 'entry.1820064998',
    email: 'entry.763039135',
  },
}

// ── Site Visit Form ───────────────────────────────────────────────────────────
// Fields: Name, Mobile, Preferred Date 1, Preferred Date 2
export const siteVisitForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeQZUxCFG0mYDVvTRXXWbVwOgPBQeP9Ft7zC8lU7XXh3DRJuw/formResponse',
  fields: {
    name: 'entry.353672268',
    mobile: 'entry.278393666',
    date1: 'entry.1651901983',
    date2: 'entry.697188075',
  },
}

// ── Brochure Download Form ────────────────────────────────────────────────────
// Fields: Name, Mobile, Email (OTP required before download)
export const brochureForm = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeyZKT_HuN-nWhPimdtMREroQ54FwOqQzzJhyBghXT0y22Xbw/formResponse',
  fields: {
    name: 'entry.662210046',
    mobile: 'entry.1767171215',
    email: 'entry.1019572093',
  },
}

export function formConfigured(form: { actionUrl: string }) {
  return form.actionUrl.startsWith('http')
}

// OTP is enabled — MSG91 keys are configured in .env.local and Vercel env vars.
export const otpEnabled = true
