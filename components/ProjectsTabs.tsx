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
                <div key={i} className="max-w-3xl mx-auto bg-parchment border border-gold/30 p-10 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                  <p className="text-[10px] tracking-[0.4em] uppercase text-gold/70 mb-2">{p.company}</p>
                  <h3 className="font-serif text-4xl text-forest font-light mb-2">{p.name}</h3>
                  <p className="text-sm text-charcoal-light mb-4">{p.location} · {p.type}</p>
                  {p.description && <p className="text-charcoal-light leading-relaxed mb-6">{p.description}</p>}
                  <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-gold/10">
                    <span className="px-4 py-1.5 border border-gold text-gold text-xs tracking-widest uppercase">ONGOING</span>
                    {p.targetCompletion && (
                      <p className="text-xs text-charcoal-light/60">{p.targetCompletion}</p>
                    )}
                    <div className="ml-auto flex gap-5">
                      <Link href="/projects/nisarga" className="text-forest text-xs tracking-widest uppercase border-b border-forest/30 pb-0.5 hover:text-gold hover:border-gold transition-colors">
                        View Project →
                      </Link>
                      <Link href="/enquire" className="text-forest text-xs tracking-widest uppercase border-b border-gold pb-0.5 hover:text-gold transition-colors">
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline */}
            <div>
              <h3 className="font-serif text-2xl text-forest mb-8 text-center">Coming Soon</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                {pipeline.map((p, i) => (
                  <div key={i} className="bg-linen border border-charcoal/10 p-6">
                    <span className="text-[10px] tracking-widest uppercase text-gold/60 mb-3 block">Pipeline</span>
                    <h4 className="font-serif text-xl text-forest mb-1">{p.name}</h4>
                    <p className="text-xs text-charcoal-light/70 mb-3">{p.location}</p>
                    {p.description && <p className="text-xs text-charcoal-light/60 leading-relaxed">{p.description}</p>}
                  </div>
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
                <div key={i} className="bg-parchment border border-charcoal/10 p-5 hover:border-gold/40 transition-colors duration-200 group">
                  <p className="text-[10px] tracking-widest uppercase text-charcoal-light/40 mb-3">{p.company}</p>
                  <h4 className="font-serif text-lg text-forest group-hover:text-gold transition-colors duration-200 leading-snug mb-1">{p.name}</h4>
                  <p className="text-xs text-charcoal-light/60 mb-3">{p.location}</p>
                  <span className={`text-[10px] tracking-widest uppercase ${typeColors[p.type] ?? 'text-charcoal-light'}`}>
                    {p.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
