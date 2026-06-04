'use client'

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth'
import { auth } from './firebase'

// Module-scoped state for the in-flight verification.
let confirmation: ConfirmationResult | null = null
let verifier: RecaptchaVerifier | null = null

function getVerifier(containerId: string): RecaptchaVerifier {
  if (!verifier) {
    verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' })
  }
  return verifier
}

/** Send an SMS OTP to an E.164 phone number (e.g. +919989990256). */
export async function sendOtp(e164Phone: string, recaptchaContainerId: string): Promise<void> {
  const v = getVerifier(recaptchaContainerId)
  confirmation = await signInWithPhoneNumber(auth, e164Phone, v)
}

/** Confirm the 6-digit code the user typed. Throws if wrong/expired. */
export async function verifyOtp(code: string): Promise<boolean> {
  if (!confirmation) throw new Error('Please request an OTP first.')
  await confirmation.confirm(code)
  return true
}

/** Reset state (e.g. user wants to change number). */
export function resetOtp(): void {
  confirmation = null
  if (verifier) {
    verifier.clear()
    verifier = null
  }
}
