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
    title: 'Welding & Metal Fabrication',
    shortDescription: 'Custom gates, burglar bars, doors, windows, and carports built to last.',
    fullDescription:
      'We fabricate and install steelwork for homes and small businesses, including secure gates, burglar bars, steel doors, and carports across Witbank and Emalahleni.',
    bullets: [
      'Custom security gates and burglar bars',
      'Steel doors, windows, and frame repairs',
      'Carport fabrication and installations'
    ],
    image: '/images/welding-gate-installation-witbank.svg',
    alt: 'welding-gate-installation-witbank'
  },
  {
    slug: 'plumbing',
    title: 'Plumbing Repairs & Installations',
    shortDescription: 'Fast leak repairs, bathroom and kitchen plumbing, and replacement fittings.',
    fullDescription:
      'From leaking pipes to full fixture installations, we handle dependable plumbing maintenance and upgrades for homes in Witbank, Emalahleni, and nearby suburbs.',
    bullets: [
      'Leak detection and pipe repairs',
      'Tap, toilet, and geyser connection work',
      'Kitchen and bathroom plumbing installations'
    ],
    image: '/images/plumbing-pipe-repair-emalahleni.svg',
    alt: 'plumbing-pipe-repair-emalahleni'
  },
  {
    slug: 'construction',
    title: 'Construction & Property Repairs',
    shortDescription: 'Small builds, renovations, brickwork, and maintenance jobs done right.',
    fullDescription:
      'We complete practical construction projects including wall repairs, paving touch-ups, concrete work, and general property improvements in Mpumalanga.',
    bullets: [
      'Small residential builds and alterations',
      'Brickwork and plaster repairs',
      'Concrete and finishing maintenance'
    ],
    image: '/images/construction-small-build-witbank.svg',
    alt: 'construction-small-build-witbank'
  }
]

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug)
