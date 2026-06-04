// ─────────────────────────────────────────────────────────────────────────────
// Lead-capture configuration: Firebase Phone OTP + Google Forms.
//
// 1. Firebase keys come from environment variables (set in .env.local locally and
//    in Vercel → Project → Settings → Environment Variables). See .env.local.example.
// 2. Google Form action URLs + field entry IDs are filled in below AFTER you create
//    the forms (these are NOT secret — they live in the page source either way).
//    Setup steps: see SETUP_LEADS_OTP.md.
// ─────────────────────────────────────────────────────────────────────────────

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
}

// OTP is active only once a Firebase API key is present.
export const otpEnabled = firebaseConfig.apiKey.length > 0

// Default country code for the mobile field.
export const COUNTRY_CODE = '+91'

// ── Google Forms ─────────────────────────────────────────────────────────────
// After creating each form: open it → ⋮ → "Get pre-filled link", fill dummy
// values, copy the link, and read the entry.XXXXX IDs from the URL. Paste them
// below. The action URL is the form's /viewform link with /viewform → /formResponse.
type FormConfig = {
  actionUrl: string
  fields: { name: string; mobile: string; email: string }
}

export const enquiryForm: FormConfig = {
  actionUrl: 'PASTE_ENQUIRY_FORM_RESPONSE_URL', // .../d/e/XXX/formResponse
  fields: {
    name: 'entry.PASTE_NAME_ID',
    mobile: 'entry.PASTE_MOBILE_ID',
    email: 'entry.PASTE_EMAIL_ID',
  },
}

export const siteVisitForm: FormConfig = {
  actionUrl: 'PASTE_SITEVISIT_FORM_RESPONSE_URL',
  fields: {
    name: 'entry.PASTE_NAME_ID',
    mobile: 'entry.PASTE_MOBILE_ID',
    email: 'entry.PASTE_EMAIL_ID',
  },
}

// Optional: log brochure downloads to a form too (leave actionUrl empty to skip).
export const brochureForm: FormConfig = {
  actionUrl: '',
  fields: {
    name: 'entry.PASTE_NAME_ID',
    mobile: 'entry.PASTE_MOBILE_ID',
    email: 'entry.PASTE_EMAIL_ID',
  },
}

export function formConfigured(f: FormConfig) {
  return f.actionUrl.startsWith('http')
}
