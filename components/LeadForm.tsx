'use client'

import { useState } from 'react'
import { COUNTRY_CODE } from '@/lib/leadConfig'
import { submitEnquiry, submitSiteVisit } from '@/lib/submitForm'

type Variant = 'enquiry' | 'siteVisit'

export default function LeadForm({ variant }: { variant: Variant }) {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const tenDigits = mobile.replace(/\D/g, '').slice(-10)
  const mobileValid = tenDigits.length === 10
  const e164 = `${COUNTRY_CODE}${tenDigits}`

  async function handleSubmit() {
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!mobileValid) return setError('Enter a valid 10-digit mobile number.')

    setBusy(true)
    try {
      if (variant === 'siteVisit') {
        await submitSiteVisit({ name: name.trim(), mobile: e164, date1, date2 })
      } else {
        await submitEnquiry({ name: name.trim(), mobile: e164, email: email.trim() || undefined })
      }
      setDone(true)
    } catch {
      setError('Something went wrong. Please call us instead.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="bg-linen border border-gold/30 p-8 text-center">
        <p className="font-serif text-2xl text-forest mb-2">Thank you{name ? `, ${name.split(' ')[0]}` : ''}.
        </p>
        <p className="text-charcoal-light text-sm leading-relaxed">
          {variant === 'siteVisit'
            ? 'Your site-visit request has been received. Our team will call you shortly to confirm a time.'
            : 'Your enquiry has been received. We\'ll get back to you within 24 hours.'}
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full bg-parchment border border-gold/30 px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors'

  return (
    <div className="bg-linen border border-gold/20 p-8">
      <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">
        {variant === 'siteVisit' ? 'Book a Site Visit' : 'Quick Enquiry'}
      </p>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Name *</label>
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Mobile *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-forest/5 border border-r-0 border-gold/30 text-charcoal-light text-sm">
              {COUNTRY_CODE}
            </span>
            <input
              className={inputCls + ' rounded-none'}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              inputMode="numeric"
              placeholder="10-digit mobile number"
            />
          </div>
        </div>

        {/* Email — only for Enquiry */}
        {variant === 'enquiry' && (
          <div>
            <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Email (optional)</label>
            <input
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
            />
          </div>
        )}

        {/* Preferred Dates — only for Site Visit */}
        {variant === 'siteVisit' && (
          <>
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Preferred Date 1</label>
              <input
                className={inputCls}
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1">Preferred Date 2 (optional)</label>
              <input
                className={inputCls}
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </>
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={busy}
          className="w-full px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark disabled:opacity-40 transition-colors duration-200"
        >
          {busy ? 'Please wait…' : variant === 'siteVisit' ? 'Request Site Visit' : 'Submit Enquiry'}
        </button>
      </div>
    </div>
  )
}
