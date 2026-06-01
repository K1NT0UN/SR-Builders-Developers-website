import FadeInView from '@/components/FadeInView'
import EnquireClient from '@/components/EnquireClient'

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
        <div className="max-w-5xl mx-auto">
          <EnquireClient />
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-linen py-16 px-6">
        <FadeInView>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Headquarters', value: 'Flat No. 109, First Floor, Aparna Green Homes Apt, Nanakramguda Rd, Financial District, Hyderabad – 500032' },
              { label: 'Phone', value: 'To be updated' },
              { label: 'Email', value: 'To be updated' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">{label}</p>
                <p className="font-serif text-lg text-forest">{value}</p>
              </div>
            ))}
          </div>
        </FadeInView>
      </section>
    </>
  )
}
