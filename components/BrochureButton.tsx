'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COUNTRY_CODE } from '@/lib/leadConfig'
import { sendOtp, verifyOtp, resetOtp } from '@/lib/otp'
import { submitBrochure } from '@/lib/submitForm'

export default function BrochureButton({
  brochureUrl,
  projectName,
  className,
}: {
  brochureUrl: string
  projectName: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)
  const mobileValid = tenDigits.length === 10
  const e164 = `${COUNTRY_CODE}${tenDigits}`

  function triggerDownload() {
    const a = document.createElement('a')
    a.href = brochureUrl
    a.download = `${projectName}-Brochure.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function finish() {
    await submitBrochure({ name: name.trim(), mobile: e164, email: email.trim() || undefined })
    triggerDownload()
    resetOtp()
    setOpen(false)
    setName(''); setMobile(''); setEmail(''); setOtpSent(false); setOtpCode(''); setError('')
  }

  async function handleSend() {
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!mobileValid) return setError('Enter a valid 10-digit mobile number.')
    setBusy(true)
    try {
      await sendOtp(e164)
      setOtpSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send OTP.')
    } finally {
      setBusy(false)
    }
  }

  async function handleVerify() {
    setError('')
    setBusy(true)
    try {
      await verifyOtp(otpCode)
      await finish()
    } catch {
      setError('Incorrect or expired code.')
    } finally {
      setBusy(false)
    }
  }

  const inputCls =
    'w-full bg-parchment border border-gold/30 px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <svg className="w-3.5 h-3.5 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Brochure
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-parchment w-full max-w-md p-8 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-charcoal-light/50 hover:text-forest text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-2">{projectName} Brochure</p>
              <h3 className="font-serif text-2xl text-forest mb-5">Verify to download</h3>

              <div className="space-y-4">
                <input
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name *"
                  disabled={otpSent}
                />
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-forest/5 border border-r-0 border-gold/30 text-charcoal-light text-sm">{COUNTRY_CODE}</span>
                  <input
                    className={inputCls}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    inputMode="numeric"
                    placeholder="10-digit mobile number *"
                    disabled={otpSent}
                  />
                </div>
                <input
                  className={inputCls}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address (optional)"
                  disabled={otpSent}
                />

                {otpSent && (
                  <div className="bg-gold/15 border border-gold px-4 py-4 space-y-3">
                    <p className="text-xs tracking-widest uppercase text-forest font-semibold">OTP sent to {COUNTRY_CODE}{tenDigits}</p>
                    <input
                      className="w-full bg-gold/10 border border-gold px-4 py-3 text-forest text-center text-xl tracking-[0.5em] font-semibold focus:outline-none focus:bg-gold/20 transition-colors placeholder:tracking-normal placeholder:text-forest/40"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="— — — — — —"
                      autoFocus
                    />
                  </div>
                )}

                {error && <p className="text-xs text-red-600">{error}</p>}

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={busy}
                    className="w-full px-8 py-4 bg-forest text-parchment text-sm tracking-widest uppercase font-semibold hover:bg-forest-dark disabled:opacity-40 transition-colors"
                  >
                    {busy ? 'Please wait…' : 'Send OTP'}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleVerify}
                      disabled={busy || otpCode.length < 6}
                      className="w-full px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark disabled:opacity-40 transition-colors"
                    >
                      {busy ? 'Verifying…' : 'Verify & Download'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtpCode(''); setError(''); resetOtp() }}
                      className="w-full text-xs text-charcoal-light/60 hover:text-forest underline transition-colors"
                    >
                      Change number
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
