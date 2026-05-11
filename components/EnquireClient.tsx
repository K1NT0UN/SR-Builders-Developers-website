'use client'

import { useState, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

type FormType = 'quick' | 'site_visit'

interface QuickForm {
  name: string
  phone: string
  email: string
  project_interest: string
  message: string
}

interface SiteVisitForm {
  name: string
  phone: string
  email: string
  preferred_date: string
  preferred_time: string
  message: string
}

const defaultQuick: QuickForm = { name: '', phone: '', email: '', project_interest: 'Nisarga — Kollur', message: '' }
const defaultVisit: SiteVisitForm = { name: '', phone: '', email: '', preferred_date: '', preferred_time: '', message: '' }

function InputField({
  label, name, type = 'text', value, onChange, required = true, placeholder = '',
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none transition-colors duration-200 placeholder:text-charcoal/30"
      />
    </div>
  )
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 bg-forest text-parchment text-sm tracking-widest uppercase hover:bg-forest-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? 'Submitting…' : label}
    </button>
  )
}

export default function EnquireClient() {
  const [activeTab, setActiveTab] = useState<FormType>('quick')
  const [quickForm, setQuickForm] = useState<QuickForm>(defaultQuick)
  const [visitForm, setVisitForm] = useState<SiteVisitForm>(defaultVisit)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<FormType | null>(null)
  const [error, setError] = useState('')

  const handleQuick = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('enquiries').insert({
      ...quickForm,
      type: 'quick',
    })
    setLoading(false)
    if (err) { setError('Something went wrong. Please try again.'); return }
    setSuccess('quick')
    setQuickForm(defaultQuick)
  }

  const handleVisit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('enquiries').insert({
      ...visitForm,
      type: 'site_visit',
    })
    setLoading(false)
    if (err) { setError('Something went wrong. Please try again.'); return }
    setSuccess('site_visit')
    setVisitForm(defaultVisit)
  }

  return (
    <>
      {/* Tab switcher */}
      <div id="forms" className="flex justify-center gap-0 mb-12">
        {[
          { id: 'quick' as FormType, label: 'Quick Enquiry' },
          { id: 'site_visit' as FormType, label: 'Book a Site Visit' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setSuccess(null); setError('') }}
            className={`px-8 py-3 text-sm tracking-widest uppercase border transition-colors duration-200 ${
              activeTab === id
                ? 'bg-forest text-parchment border-forest'
                : 'bg-transparent text-charcoal-light border-charcoal/20 hover:border-forest hover:text-forest'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        {/* Success message */}
        {success && (
          <div className="bg-forest/10 border border-gold/30 text-forest px-6 py-4 mb-8 text-sm text-center">
            {success === 'quick'
              ? 'Thank you for your enquiry. Our team will be in touch shortly.'
              : 'Your site visit request has been received. We will confirm your booking soon.'}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 mb-8 text-sm text-center">
            {error}
          </div>
        )}

        {/* Quick Enquiry Form */}
        {activeTab === 'quick' && (
          <form onSubmit={handleQuick} className="space-y-5">
            <InputField label="Full Name" name="name" value={quickForm.name}
              onChange={e => setQuickForm(f => ({ ...f, name: e.target.value }))} />
            <InputField label="Phone Number" name="phone" type="tel" value={quickForm.phone}
              onChange={e => setQuickForm(f => ({ ...f, phone: e.target.value }))} />
            <InputField label="Email Address" name="email" type="email" value={quickForm.email}
              onChange={e => setQuickForm(f => ({ ...f, email: e.target.value }))} />
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1.5">Project Interest</label>
              <select
                value={quickForm.project_interest}
                onChange={e => setQuickForm(f => ({ ...f, project_interest: e.target.value }))}
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none transition-colors duration-200"
              >
                <option>Nisarga — Kollur</option>
                <option>Pipeline — Borampet Villas</option>
                <option>Pipeline — Nagole Villas</option>
                <option>Pipeline — Medchal Commercial</option>
                <option>General Enquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1.5">Message (Optional)</label>
              <textarea
                rows={4}
                value={quickForm.message}
                onChange={e => setQuickForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Any questions or specific requirements…"
              />
            </div>
            <SubmitButton loading={loading} label="Send Enquiry" />
          </form>
        )}

        {/* Site Visit Form */}
        {activeTab === 'site_visit' && (
          <form id="site-visit" onSubmit={handleVisit} className="space-y-5">
            <InputField label="Full Name" name="name" value={visitForm.name}
              onChange={e => setVisitForm(f => ({ ...f, name: e.target.value }))} />
            <InputField label="Phone Number" name="phone" type="tel" value={visitForm.phone}
              onChange={e => setVisitForm(f => ({ ...f, phone: e.target.value }))} />
            <InputField label="Email Address" name="email" type="email" value={visitForm.email}
              onChange={e => setVisitForm(f => ({ ...f, email: e.target.value }))} />
            <InputField label="Preferred Date" name="preferred_date" type="date" value={visitForm.preferred_date}
              onChange={e => setVisitForm(f => ({ ...f, preferred_date: e.target.value }))} />
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1.5">Preferred Time</label>
              <select
                value={visitForm.preferred_time}
                onChange={e => setVisitForm(f => ({ ...f, preferred_time: e.target.value }))}
                required
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none transition-colors duration-200"
              >
                <option value="">Select a time slot</option>
                <option>10:00 AM – 11:00 AM</option>
                <option>11:00 AM – 12:00 PM</option>
                <option>2:00 PM – 3:00 PM</option>
                <option>3:00 PM – 4:00 PM</option>
                <option>4:00 PM – 5:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 mb-1.5">Additional Notes (Optional)</label>
              <textarea
                rows={4}
                value={visitForm.message}
                onChange={e => setVisitForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Number of people, accessibility needs, etc."
              />
            </div>
            <SubmitButton loading={loading} label="Book Site Visit" />
          </form>
        )}
      </div>
    </>
  )
}
