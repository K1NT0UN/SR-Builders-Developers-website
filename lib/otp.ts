'use client'

import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth'
import { auth } from './firebase'

let confirmationResult: ConfirmationResult | null = null
let recaptchaVerifier: RecaptchaVerifier | null = null

export async function sendOtp(e164Phone: string, recaptchaContainerId = 'recaptcha-container'): Promise<void> {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
  recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, { size: 'invisible' })
  confirmationResult = await signInWithPhoneNumber(auth, e164Phone, recaptchaVerifier)
}

export async function verifyOtp(code: string): Promise<boolean> {
  if (!confirmationResult) throw new Error('Please request an OTP first.')
  await confirmationResult.confirm(code)
  return true
}

export function resetOtp(): void {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
  confirmationResult = null
}
