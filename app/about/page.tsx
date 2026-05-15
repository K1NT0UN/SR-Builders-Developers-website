'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeInView from '@/components/FadeInView'

const coreStrengths = [
  '24+ completed projects across residential, commercial, and mixed-use segments',
  'Debt-free balance sheet — no existing loans or credit facilities',
  'In-house civil engineering team ensuring quality control and execution excellence',
  'Long-standing relationships with architects, contractors, and accountants',
  'Active RERA registration underway for the flagship Kollur project',
]

const entities = [
  { name: 'SR Builders and Developers', segment: 'Residential & Villas', active: true },
  { name: 'SM Builders', segment: 'Residential & Commercial', active: true },
  { name: 'SM Builders and Developers', segment: 'Residential', active: true },
]

const leadership = [
  {
    initials: 'VR',
    role: 'Founder & Promoter',
    name: 'Mr. Vasu Raavi',
    tagline: 'Vision · Strategy · Legacy',
    qualifications: null,
    bio: 'Starting from humble beginnings in Nellore, Andhra Pradesh, Mr. Vasu Raavi built the SRSM Group from the ground up over more than two decades. His hands-on involvement — from land acquisition to project delivery — has shaped the Group\'s culture of quality and integrity.',
  },
  {
    initials: 'R',
    role: 'Co-Director',
    name: 'Rabani',
    tagline: 'Operations · Oversight',
    qualifications: null,
    bio: '',
  },
  {
    initials: 'YR',
    role: 'Co-Director',
    name: 'Yashwanth Raavi',
    tagline: 'Projects · Development',
    qualifications: '[Qualifications to be added]',
    bio: '',
  },
  {
    initials: 'J',
    role: 'Co-Director',
    name: 'Jagan',
    tagline: 'Finance · Liaison',
    qualifications: null,
    bio: '',
  },
  {
    initials: 'RRC',
    role: 'Director',
    name: 'Raavi Rishi Chowdary',
    tagline: 'Strategy · Investments',
    qualifications: '[Qualifications to be added]',
    bio: '',
  },
  {
    initials: 'MR',
    role: 'In-house Architect',
    name: 'Manaswitha Raavi',
    tagline: 'Design · Planning',
    qualifications: '[Qualifications to be added]',
    bio: '',
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
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-6">Our Purpose</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-snug mb-8">
              Built on Trust. <span className="font-light text-gold">Delivered with Excellence.</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed text-base md:text-lg">
              For over 25 years, SR Builders and Developers has built homes that stand as testaments to craftsmanship and integrity.
              Debt-free, in-house engineered, and community-focused — we don&apos;t just construct buildings,
              we shape neighbourhoods.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* About the Company */}
      <section className="bg-linen py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeInView direction="left">
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">Our Legacy</p>
            <h2 className="font-serif text-4xl text-forest mb-6 leading-snug">
              25 Years of Building <span className="font-light">with Purpose</span>
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-5">
              SR Builders and Developers is a Hyderabad-based real estate developer with over 25 years of legacy in construction
              and real estate development. Operating through three active legal entities, the Group has delivered 24+ residential
              and commercial projects across Hyderabad, Vizag, and Bangalore.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              The Group has built its reputation on quality construction, timely delivery, and a customer-first philosophy.
              With a strong pipeline of upcoming projects across Hyderabad, SR Builders is poised for its next phase of significant growth.
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
            <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-6">Mission</p>
            <blockquote className="font-serif text-3xl md:text-4xl text-parchment leading-snug font-light mb-8">
              &ldquo;To deliver homes and spaces that enrich lives — built with integrity, crafted with precision,
              and rooted in the communities we serve.&rdquo;
            </blockquote>
            <p className="text-parchment/60 text-sm">
              Cities of Operation: Hyderabad · Vizag · Bangalore
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Group Entities */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInView>
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.5em] uppercase text-gold mb-3">Structure</p>
              <h2 className="font-serif text-4xl text-forest">Group Entities</h2>
            </div>
          </FadeInView>
          <div className="grid sm:grid-cols-3 gap-4">
            {entities.map((entity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(26,51,32,0.15)' }}
                className="p-6 border border-gold/30 bg-linen cursor-default group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg text-forest group-hover:text-gold transition-colors duration-200 leading-snug">
                    {entity.name}
                  </h3>
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 shrink-0 bg-gold/10 text-gold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-charcoal-light/70 group-hover:text-charcoal-light transition-colors duration-200">
                  {entity.segment}
                </p>
              </motion.div>
            ))}
          </div>
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
            <p className="text-xs tracking-[0.5em] uppercase text-gold/70 mb-4">Our Work</p>
            <h2 className="font-serif text-3xl text-parchment mb-6">Explore 24+ Completed Projects</h2>
            <Link
              href="/projects"
              className="inline-block px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
            >
              View All Projects
            </Link>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
