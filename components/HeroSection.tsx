'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
]

export default function HeroSection() {
  const [imgIndex] = useState(() => Math.floor(Math.random() * heroImages.length))
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.4')
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImages[imgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Fallback gradient shown when image is missing */}
      <div className="absolute inset-0 bg-forest" style={{ zIndex: -1 }} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-forest/70" />

      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <p ref={eyebrowRef} className="text-gold text-xs tracking-[0.5em] uppercase mb-6">
          Flagship Project · Nisarga — Kollur
        </p>
        <h1 ref={titleRef} className="font-serif text-6xl sm:text-7xl md:text-8xl text-parchment leading-none mb-6">
          SR <span className="text-gold font-light">Builders</span>
        </h1>
        <p ref={subtitleRef} className="text-parchment/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Creators of Nisarga — 4 &amp; 5 BHK Forestscape Villas in Kollur, Hyderabad. 25 years of building trust, quality, and lasting legacies.
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="px-8 py-4 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
          >
            Explore Projects
          </Link>
          <Link
            href="/enquire"
            className="px-8 py-4 border border-parchment/50 text-parchment text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-200"
          >
            Enquire Now
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-parchment/40">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="block w-px h-8 bg-parchment/20" />
      </div>
    </section>
  )
}
