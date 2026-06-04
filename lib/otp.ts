'use client'

// Module-scoped state to keep track of the mobile number being verified
let currentMobile: string | null = null

/** Send an SMS OTP to an E.164 phone number (e.g. +919989990256). */
export async function sendOtp(e164Phone: string, _recaptchaContainerId?: string): Promise<void> {
  // We keep the signature the same so we don't break existing calls, 
  // though recaptcha is no longer used.
  
  // Strip the + for MSG91 (depends on MSG91 config, usually wants country code without +)
  // Our Next.js backend will handle the exact format if needed, but let's pass E.164 directly.
  // Actually, MSG91 prefers "919989990256" without the plus. We'll strip the plus.
  const mobile = e164Phone.replace('+', '')
  
  const res = await fetch('/api/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile })
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Failed to send OTP')
  }

  currentMobile = mobile
}

/** Confirm the 6-digit code the user typed. Throws if wrong/expired. */
export async function verifyOtp(code: string): Promise<boolean> {
  if (!currentMobile) throw new Error('Please request an OTP first.')
  
  const res = await fetch('/api/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: currentMobile, otp: code })
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Failed to verify OTP')
  }

  return true
}

/** Reset state (e.g. user wants to change number). */
export function resetOtp(): void {
  currentMobile = null
}
