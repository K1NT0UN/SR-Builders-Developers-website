'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeInView from '@/components/FadeInView'

const coreStrengths = [
  'Zero debt — every project funded entirely without loans or credit facilities',
  'In-house civil engineering from foundation to handover, no outsourced oversight',
  'Vaastu-compliant design across all residential projects',
  'RERA-registered flagship township at Kollur — PO22000007723',
  'Two decades of trusted relationships with Hyderabad\'s leading architects and contractors',
]

const leadership = [
  {
    initials: 'VR',
    role: 'Founder & Promoter',
    name: 'Mr. Vasu Raavi',
    tagline: 'Vision · Strategy · Legacy',
    qualifications: null,
    bio: 'Starting from humble beginnings in Nellore, Andhra Pradesh, Mr. Vasu Raavi built SR Builders and Developers from the ground up over more than two decades. His hands-on involvement — from land acquisition to project delivery — has shaped the company\'s culture of quality and integrity.',
  },
  {
    initials: 'R',
    role: 'Co-Director',
    name: 'Rabani',
    tagline: 'Operations · Oversight',
    qualifications: null,
    bio: 'Rabani oversees day-to-day operations across SR Builders’ active sites, ensuring every project moves from groundwork to handover with discipline, accountability, and close attention to detail.',
  },
  {
    initials: 'YR',
    role: 'Co-Director',
    name: 'Yashwanth Raavi',
    tagline: 'Projects · Development',
    qualifications: null,
    bio: 'Yashwanth Raavi leads project development and execution, turning plans into delivered homes while safeguarding the quality and timelines that define the company’s reputation.',
  },
  {
    initials: ‘JR’,
    role: ‘Director’,
    name: ‘Jagan Reddy’,
    tagline: ‘Finance · Compliance · Governance’,
    qualifications: ‘Chartered Accountant (CA)’,
    bio: ‘Jagan Reddy is a Chartered Accountant and Director with extensive experience in financial management, legal compliance, and stakeholder liaisoning within the construction sector. He has a proven track record of establishing robust financial controls, delivering accurate project accounting and cash-flow forecasting, and optimising cost management across large-scale construction projects. Well-versed in contract review, statutory compliance, and risk mitigation, Jagan ensures adherence to regulatory requirements, procurement norms, and contractor agreements. An effective communicator and relationship-builder, he manages relationships with banks, insurers, auditors, regulators, subcontractors, and joint-venture partners to secure timely approvals and financing. His strategic oversight of budgeting, statutory reporting, and governance supports operational efficiency, timely project delivery, and long-term value creation for clients and shareholders.’,
  },
  {
    initials: 'CR',
    role: 'Partner',
    name: 'CHV Radha Krishna',
    tagline: 'Partnership · Growth',
    qualifications: null,
    bio: 'A trusted partner in the company’s journey, CHV Radha Krishna supports SR Builders’ growth through long-standing relationships and a shared commitment to building well and building honestly.',
  },
]


export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-forest pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Who We Are</p>
            <h1 className="font-serif text-5xl md:text-7xl text-parchment leading-tight">
              About <span className="font-light text-gold">SR Builders</span>
            </h1>
          </FadeInView>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-parchment py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">Our Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-snug mb-8">
              Homes Built to Last.{' '}
              <span className="font-light text-gold">Relationships That Do Too.</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed text-base md:text-lg">
              SR Builders and Developers was founded on a simple conviction — that the people who buy a home deserve the same
              care and attention as the people who build one. Over 25 years, that conviction has shaped every decision we make,
              from the land we acquire to the materials we specify.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* About the Company */}
      <section className="bg-linen py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeInView direction="left">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Our Story</p>
            <h2 className="font-serif text-4xl text-forest mb-6 leading-snug">
              Rooted in Hyderabad. <span className="font-light">Built for Generations.</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-5">
              What began as a single residential project in Hyderabad has grown into a company with a 25-year record of
              delivering quality homes across the city. SR Builders and Developers was built the hard way —
              project by project, relationship by relationship, without shortcuts.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              Today, with Nisarga Villas at Kollur, we are building at a scale we have always been capable of —
              a 17-acre gated township where 50+ amenities, two clubhouses, and a design philosophy that places
              nature at the centre of every home come together in a single address.
            </p>
          </FadeInView>

          <FadeInView direction="right" delay={0.1}>
            <div className="bg-parchment p-8 border-l-4 border-gold">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">Core Strengths</p>
              <ul className="space-y-4">
                {coreStrengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-charcoal-light text-sm leading-relaxed">
                    <span className="text-gold mt-0.5 shrink-0">◆</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="bg-forest py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-6">What We Stand For</p>
            <blockquote className="font-serif text-3xl md:text-4xl text-parchment leading-snug font-light mb-8">
              &ldquo;Build well. Build honestly. Build something that makes the people inside it proud.&rdquo;
            </blockquote>
            <p className="text-parchment/60 text-sm">
              The founding principle of SR Builders and Developers · Hyderabad, Telangana
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-linen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">The People Behind</p>
              <h2 className="font-serif text-4xl text-forest">Leadership</h2>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(26,51,32,0.12)' }}
                className="bg-parchment border border-gold/20 p-8 flex flex-col h-full cursor-default group hover:border-gold/60"
              >
                <div className="w-20 h-20 rounded-full bg-forest/10 border-2 border-gold/20 group-hover:border-gold/60 group-hover:bg-forest/20 flex items-center justify-center mb-5 self-start transition-all duration-300">
                  <span className="font-serif text-xl text-forest font-semibold">{person.initials}</span>
                </div>

                <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-1">{person.role}</p>
                <h3 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors duration-300 mb-1">
                  {person.name}
                </h3>
                <p className="text-xs text-charcoal-light/50 uppercase tracking-wider mb-4">{person.tagline}</p>

                {person.qualifications !== null && (
                  <p className="text-xs text-gold/70 italic mb-4 border-l-2 border-gold/20 pl-3">
                    {person.qualifications}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gold/10">
                  {person.bio ? (
                    <p className="text-charcoal-light text-sm leading-relaxed">{person.bio}</p>
                  ) : (
                    <p className="text-charcoal-light/30 text-sm italic">[Quote or brief bio to be added]</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Projects */}
      <section className="bg-forest py-20 px-6">
        <FadeInView>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-4">Our Portfolio</p>
            <h2 className="font-serif text-3xl text-parchment mb-6">25 Years of Work, One Address at a Time</h2>
            <Link
              href="/projects"
              className="inline-block px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
            >
              See What We&apos;ve Built
            </Link>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
