import FadeInView from '@/components/FadeInView'
import EnquireForms from '@/components/EnquireForms'

export default function EnquirePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">We&apos;d Love to Hear From You</p>
            <h1 className="font-serif text-5xl md:text-7xl text-parchment leading-tight">
              Enquire <span className="font-light text-gold">Now</span>
            </h1>
            <p className="text-parchment/60 mt-6 text-base max-w-md mx-auto">
              Fill in the form below and our team will reach out within 24 hours.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Forms */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-lg mx-auto">
          <EnquireForms />
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-linen py-16 px-6">
        <FadeInView>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Corporate Office</p>
              <a
                href="https://maps.app.goo.gl/4gPbrXw7e8HQVVpS8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-base text-forest hover:text-gold transition-colors leading-snug block"
              >
                4th Floor, C1 Block, Vaishnavi Symbol,<br />
                Financial District, Nanakramguda,<br />
                Hyderabad, Telangana – 500032
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Nisarga Site Office</p>
              <a
                href="https://maps.app.goo.gl/n3kFgFqyRdASwSuc6"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-base text-forest hover:text-gold transition-colors leading-snug block"
              >
                F6RX+574, Patancheruvu,<br />
                Hyderabad, Telangana – 502300
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Phone</p>
              <a href="tel:+919492239339" className="font-serif text-lg text-forest hover:text-gold transition-colors block">+91 94922 39339</a>
              <a href="tel:+919989990256" className="font-serif text-lg text-forest hover:text-gold transition-colors block">+91 99899 90256</a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">Email</p>
              <a href="mailto:srbuildersnisarga@gmail.com" className="font-serif text-base text-forest hover:text-gold transition-colors break-words block">srbuildersnisarga@gmail.com</a>
            </div>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
