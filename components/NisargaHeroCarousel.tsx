'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const heroImages = [
  '/images/nisarga/hero-1.jpg',
  '/images/nisarga/hero-2.jpg',
  '/images/nisarga/hero-3.jpg',
  '/images/nisarga/hero-4.jpg',
  '/images/nisarga/hero-5.jpg',
  '/images/nisarga/hero-6.jpg',
  '/images/nisarga/hero-7.jpg',
]

export default function NisargaHeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={heroImages[current]}
            alt={`Nisarga — view ${current + 1}`}
            fill
            className="object-cover object-center"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
        <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">A Project by SR Builders</p>
        <h1 className="font-serif text-6xl md:text-8xl text-parchment leading-tight">
          The Nisarga
        </h1>
        <p className="text-parchment/80 text-xl md:text-2xl mt-3 font-light">
          Where Green Meets Grandeur
        </p>
        <p className="text-parchment/60 mt-2 text-sm tracking-wide">
          4 &amp; 5 BHK Forestscape Villas · Patighanpur, Kollur, Hyderabad
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/enquire#site-visit"
            className="px-8 py-3.5 bg-gold text-forest text-sm tracking-widest uppercase font-semibold hover:bg-gold-dark transition-colors duration-200"
          >
            Book a Site Visit
          </Link>
          <a
            href="#villas"
            className="px-8 py-3.5 border border-parchment/40 text-parchment text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-200"
          >
            Explore Villas
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-12 z-10 flex gap-2 items-center">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-gold w-6' : 'bg-parchment/40 w-1.5'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
