const BUSINESS_DETAILS = {
  businessName: 'Beasy-Link Projects',
  phone: '083-521-0920',
  whatsapp: '27835210920',
  email: 'beeasylink@gmail.com',
  streetAddress: '1710 Duvha Park Ext 8',
  city: 'Emalahleni',
  province: 'Mpumalanga',
  country: 'South Africa',
  postalCode: '1035',
  serviceAreas: ['Witbank', 'Emalahleni', 'Tasbet Park', 'Reyno Ridge', 'Ben Fleur', 'Duvha Park'],
  openingHours: 'Mon-Sat: 07:00-18:00',
  yearEstablished: 2009,
  clientsServed: 432,
  projectsCompleted: 783,
  calloutFee: 'R200',
  primaryServices: [
    'Boilermaking and welding',
    'Custom car ports, gates, windows, and doors',
    'Plumbing installations and repairs',
    'Electrical services and home wiring',
    'General construction and maintenance'
  ]
} as const

export const useBusinessDetails = () => {
  const telLink = `tel:${BUSINESS_DETAILS.phone.replace(/[^\d+]/g, '')}`
  const whatsappLink = `https://wa.me/${BUSINESS_DETAILS.whatsapp}`

  return {
    ...BUSINESS_DETAILS,
    telLink,
    whatsappLink
  }
}
