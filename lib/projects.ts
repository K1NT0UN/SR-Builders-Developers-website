export type ProjectStatus = 'ONGOING' | 'COMPLETED' | 'PIPELINE'
export type ProjectType = 'Residential' | 'Commercial' | 'RE & Comm' | 'Integrated Township'

export interface Project {
  company: string
  name: string
  location: string
  status: ProjectStatus
  type: ProjectType | string
  description?: string
  targetCompletion?: string
}

export const currentProjects: Project[] = [
  {
    company: 'SR Builders and Developers',
    name: 'Nisarga',
    location: 'Kollur, Hyderabad',
    status: 'ONGOING',
    type: 'Integrated Township — Villas',
    description:
      'A landmark gated township offering premium 4 & 5 BHK forestscape villas on 17+ acres in Kollur, one of Hyderabad\'s fastest-growing corridors. 50+ amenities, 2 clubhouses. RERA: PO22000007723.',
    targetCompletion: 'Villas: End of 2028',
  },
]

export const pipelineProjects: Project[] = [
  {
    company: 'SR Builders and Developers',
    name: 'Nisarga Apartments',
    location: 'Kollur, Hyderabad',
    status: 'PIPELINE',
    type: 'Residential',
    description: 'A premium high-rise residential development within the Nisarga township, Kollur — Hyderabad\'s fastest-growing corridor. Designed for modern urban living with world-class amenities, shared access to the Nisarga township infrastructure, and proximity to Pharma City, Metro Phase-2, and major IT hubs.',
    targetCompletion: 'End of 2030',
  },
]

export const completedProjects: Project[] = [
  { company: 'SR Builders and Developers', name: "MSR's Serene City", location: 'Miyapur', status: 'COMPLETED', type: 'Residential' },
  { company: 'SR Builders and Developers', name: 'SM Classic', location: 'Kondapur', status: 'COMPLETED', type: 'Residential' },
]
