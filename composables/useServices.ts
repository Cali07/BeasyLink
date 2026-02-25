export type ServiceItem = {
  slug: 'welding' | 'plumbing' | 'construction'
  title: string
  shortDescription: string
  fullDescription: string
  bullets: string[]
  image: string
  alt: string
}

export const services: ServiceItem[] = [
  {
    slug: 'welding',
    title: 'Boilermaking, Welding & Metal Fabrication',
    shortDescription: 'Custom gates, burglar proofing, steel doors, and structural welding that lasts.',
    fullDescription:
      'From heavy-duty boilermaking work to residential gate fabrication, we build and install secure metal solutions for homes, businesses, and mining projects in Emalahleni.',
    bullets: [
      'Custom security gates and burglar proofing',
      'Steel and aluminium doors, windows, and frames',
      'Car ports, mining shelves, and structural fabrication'
    ],
    image: '/images/custom-gate-fabrication-team.jpg',
    alt: 'Team discussing custom gate fabrication project in Emalahleni'
  },
  {
    slug: 'plumbing',
    title: 'Plumbing Installations & Repairs',
    shortDescription: 'Bathroom upgrades, leak repairs, and clean plumbing installations for homes and rentals.',
    fullDescription:
      'We provide dependable plumbing services including pipe repairs, bathroom fittings, and full fixture installations with neat finishing and practical solutions.',
    bullets: [
      'Leak detection and pipe repair',
      'Shower, toilet, and bathtub installation',
      'Bathroom and kitchen plumbing maintenance'
    ],
    image: '/images/bathroom-shower-toilet-installation.jpg',
    alt: 'Modern shower and toilet plumbing installation by Beasy-Link Projects'
  },
  {
    slug: 'construction',
    title: 'Construction, Electrical & Maintenance',
    shortDescription: 'Building, wiring, renovations, and property repairs for residential and commercial spaces.',
    fullDescription:
      'Beasy-Link Projects handles construction and maintenance projects from small building works to home wiring, garage repairs, and site improvements across Witbank and nearby areas.',
    bullets: [
      'Small construction and renovation projects',
      'Home and garage wiring with electrical repairs',
      'General maintenance, fittings, and finishing work'
    ],
    image: '/images/construction-township-project-emalahleni.png',
    alt: 'Construction project in a township area in Emalahleni'
  }
]

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug)
