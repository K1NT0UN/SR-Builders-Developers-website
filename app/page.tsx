import type { Metadata } from 'next'
import NisargaPageContent from '@/components/NisargaPageContent'

export const metadata: Metadata = {
  title: 'Nisarga — 4 & 5 BHK Forestscape Villas in Kollur, Hyderabad | SR Builders',
  description:
    'Discover Nisarga by SR Builders — premium 4 & 5 BHK villas on 17+ acres in Kollur, Hyderabad. 50+ amenities, 2 clubhouses, 4000 acres of greenery nearby.',
}

export default function HomePage() {
  return <NisargaPageContent />
}
