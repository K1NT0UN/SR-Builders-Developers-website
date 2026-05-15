'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const stats = [
  { value: 25, suffix: '+', label: 'Years of Experience' },
  { value: 24, suffix: '+', label: 'Completed Projects' },
  { value: 3, suffix: '', label: 'Active Entities' },
  { value: 30, suffix: '+', label: 'Full-Time Employees' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggers = stats.map((stat, i) => {
      const el = numberRefs.current[i]
      if (!el) return null

      const obj = { val: 0 }
      return gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        onUpdate() {
          el.textContent = Math.round(obj.val) + stat.suffix
        },
      })
    })

    return () => {
      triggers.forEach(t => t?.kill())
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-forest py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <div className="font-serif text-5xl md:text-6xl text-gold mb-2">
              <span ref={el => { numberRefs.current[i] = el }}>0{stat.suffix}</span>
            </div>
            <p className="text-parchment/60 text-xs tracking-widest uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
