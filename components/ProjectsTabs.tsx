'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/lib/projects'

interface Props {
  current: Project[]
  pipeline: Project[]
  completed: Project[]
}

const typeColors: Record<string, string> = {
  Residential: 'text-forest',
  Commercial: 'text-charcoal-light',
  'RE & Comm': 'text-gold-dark',
  'Integrated Township': 'text-gold',
}

// Border accent color per pipeline project index
const pipelineBorderColors = [
  'border-gold',          // Nisarga Apartments — gold (flagship sibling)
  'border-forest/50',
  'border-forest/50',
  'border-forest/30',
  'border-forest/30',
  'border-forest/30',
  'border-forest/30',
]

export default function ProjectsTabs({ current, pipeline, completed }: Props) {
  const [tab, setTab] = useState<'current' | 'completed'>('current')

  return (
    <>
      {/* Tab switcher */}
      <div className="flex justify-center gap-0 mb-16">
        {(['current', 'completed'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-10 py-3 text-sm tracking-widest uppercase transition-colors duration-200 border ${
              tab === t
                ? 'bg-forest text-parchment border-forest'
                : 'bg-transparent text-charcoal-light border-charcoal/20 hover:border-forest hover:text-forest'
            }`}
          >
            {t === 'current' ? 'Current & Pipeline' : `Completed (${completed.length})`}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'current' && (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Ongoing */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl text-forest mb-8 text-center">Ongoing</h3>
              {current.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(26,51,32,0.14)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="max-w-3xl mx-auto bg-forest/5 border border-gold/40 p-10 relative group cursor-default hover:border-gold transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                  <p className="text-[10px] tracking-[0.4em] uppercase text-forest font-bold mb-2">{p.company}</p>
                  <h3 className="font-serif text-4xl text-forest font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="text-sm text-charcoal-light mb-4">{p.location} · {p.type}</p>
                  {p.description && (
                    <p className="text-charcoal-light leading-relaxed mb-6">{p.description}</p>
                  )}
                  <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-gold/20">
                    <span className="px-4 py-1.5 border border-gold text-gold text-xs tracking-widest uppercase">
                      ONGOING
                    </span>
                    {p.targetCompletion && (
                      <p className="text-xs text-charcoal-light/60">{p.targetCompletion}</p>
                    )}
                    <div className="ml-auto flex gap-5">
                      <Link
                        href="/projects/nisarga"
                        className="text-forest text-xs tracking-widest uppercase border-b border-forest/30 pb-0.5 hover:text-gold hover:border-gold transition-colors font-semibold"
                      >
                        View Project →
                      </Link>
                      <Link
                        href="/enquire"
                        className="text-forest text-xs tracking-widest uppercase border-b border-gold pb-0.5 hover:text-gold transition-colors"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pipeline */}
            <div>
              <h3 className="font-serif text-2xl text-forest mb-8 text-center">Coming Soon</h3>
              <div className="max-w-3xl mx-auto space-y-4">
                {pipeline.map((p, i) => (
                  i === 0 ? (
                    /* ── Nisarga Apartments — featured tile ── */
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(200,169,81,0.18)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="border-2 border-gold bg-forest/4 p-10 relative group cursor-default overflow-hidden"
                    >
                      {/* gold accent bar */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold mb-3 block">
                            Coming Soon · SR Builders and Developers
                          </span>
                          <h4 className="font-serif text-3xl text-forest group-hover:text-gold transition-colors duration-300 mb-1 font-bold">
                            {p.name}
                            <span className="ml-3 align-middle text-[10px] tracking-widest uppercase text-gold/60 font-sans font-normal border border-gold/40 px-2 py-0.5">
                              Name TBD
                            </span>
                          </h4>
                          <p className="text-sm text-charcoal-light mb-4">{p.location} · {p.type}</p>
                          {p.description && (
                            <p className="text-sm text-charcoal-light leading-relaxed max-w-lg">{p.description}</p>
                          )}
                          <div className="mt-5 flex flex-wrap gap-4 text-xs">
                            {['High-Rise Living', 'Nisarga Township', 'Premium Apartments', 'Kollur Corridor'].map(tag => (
                              <span key={tag} className="px-3 py-1 border border-gold/30 text-gold/80 tracking-wide uppercase">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="shrink-0 md:text-right">
                          <span className="inline-block px-4 py-1.5 border border-gold text-gold text-[10px] tracking-widest uppercase mb-3">
                            Pipeline
                          </span>
                          {p.targetCompletion && (
                            <p className="text-xs text-charcoal-light/60">{p.targetCompletion}</p>
                          )}
                          <Link
                            href="/enquire"
                            className="mt-4 block text-[10px] tracking-widest uppercase text-forest border-b border-gold pb-0.5 hover:text-gold transition-colors text-right"
                          >
                            Register Interest →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(26,51,32,0.12)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className={`bg-transparent border-2 ${pipelineBorderColors[i] ?? 'border-forest/30'} p-8 relative group cursor-default hover:bg-forest/[0.03] transition-all duration-300`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-charcoal-light/50 mb-2 block">Pipeline</span>
                        <h4 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors duration-300 mb-1">
                          {p.name}
                        </h4>
                        <p className="text-xs text-charcoal-light/70 mb-2">{p.location}</p>
                        {p.description && (
                          <p className="text-sm text-charcoal-light/70 leading-relaxed">{p.description}</p>
                        )}
                      </div>
                      <div className="shrink-0">
                        {p.targetCompletion && (
                          <p className="text-xs text-charcoal-light/50 md:text-right">{p.targetCompletion}</p>
                        )}
                        <span className="mt-2 inline-block text-[10px] tracking-widest uppercase px-3 py-1 border border-forest/30 text-forest/50">
                          Pipeline
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {completed.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, backgroundColor: 'rgb(26 51 32 / 0.04)', boxShadow: '0 8px 24px rgba(26,51,32,0.1)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="bg-parchment border border-charcoal/10 p-5 group cursor-default hover:border-gold/40 transition-colors duration-200"
                >
                  <p className="text-[10px] tracking-widest uppercase text-charcoal-light/40 mb-3 group-hover:text-charcoal-light/60 transition-colors">
                    {p.company}
                  </p>
                  <h4 className="font-serif text-lg text-forest group-hover:text-gold transition-colors duration-200 leading-snug mb-1">
                    {p.name}
                  </h4>
                  <p className="text-xs text-charcoal-light/60 mb-3">{p.location}</p>
                  <span className={`text-[10px] tracking-widest uppercase ${typeColors[p.type] ?? 'text-charcoal-light'}`}>
                    {p.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
