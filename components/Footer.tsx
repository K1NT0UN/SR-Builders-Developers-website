import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-forest text-parchment/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5 overflow-visible">
              <Image
                src="/images/sr-builders-logo-light.png"
                alt="SR Builders and Developers"
                width={1678}
                height={456}
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-parchment/60 max-w-xs">
              25+ years of excellence in construction and real estate across Hyderabad, Vizag, and Bangalore. A project by SR Builders and Developers.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5 tracking-wide">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/projects', label: 'Projects' },
                { href: '/enquire', label: 'Enquire Now' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gold transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5 tracking-wide">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-parchment/60">
              <p>Flat No. 109, First Floor, Aparna Green Homes Apartment,</p>
              <p>Opp. Golf View Apartments, Nanakramguda Rd,</p>
              <p>Financial District, Nanakramguda,</p>
              <p>Hyderabad, Telangana – 500032</p>
              <p>Phone: To be updated</p>
              <p>Email: To be updated</p>
            </address>
            <div className="mt-6">
              <p className="text-xs tracking-widest uppercase text-parchment/40">Flagship Project</p>
              <Link href="/projects/nisarga" className="font-serif text-xl text-parchment hover:text-gold transition-colors duration-200">
                Nisarga — Kollur
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-parchment/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-parchment/30 tracking-wide">
          <p>© {new Date().getFullYear()} SRSM Group. All rights reserved.</p>
          <p>SR Builders &amp; Developers · SM Builders · SM Builders and Developers</p>
        </div>
      </div>
    </footer>
  )
}
