'use client'

import { useState, useEffect } from 'react'
import LeadForm from '@/components/LeadForm'

export default function EnquireForms() {
  const [tab, setTab] = useState<'enquiry' | 'siteVisit'>('enquiry')

  useEffect(() => {
    if (window.location.hash === '#site-visit') setTab('siteVisit')
  }, [])

  return (
    <div>
      <div className="flex mb-6 border border-gold/30">
        <button
          onClick={() => setTab('enquiry')}
          className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${
            tab === 'enquiry' ? 'bg-forest text-parchment' : 'bg-parchment text-forest hover:bg-linen'
          }`}
        >
          Quick Enquiry
        </button>
        <button
          onClick={() => setTab('siteVisit')}
          className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${
            tab === 'siteVisit' ? 'bg-forest text-parchment' : 'bg-parchment text-forest hover:bg-linen'
          }`}
        >
          Book Site Visit
        </button>
      </div>
      <LeadForm key={tab} variant={tab} />
    </div>
  )
}
