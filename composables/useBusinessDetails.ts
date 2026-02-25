const BUSINESS_DETAILS = {
  businessName: 'Beasylink Projects',
  phone: '+27 72 345 6789',
  whatsapp: '27723456789',
  email: 'info@beasylink-projects.co.za',
  serviceAreas: ['Witbank', 'Emalahleni', 'Tasbet Park', 'Reyno Ridge', 'Ben Fleur', 'Klipfontein'],
  openingHours: 'Mon-Sat: 07:00-18:00',
  primaryServices: [
    'Welding & metal fabrication',
    'Plumbing repairs and installation',
    'Construction and property repairs'
  ]
} as const

export const useBusinessDetails = () => {
  const telLink = `tel:${BUSINESS_DETAILS.phone.replace(/\s/g, '')}`
  const whatsappLink = `https://wa.me/${BUSINESS_DETAILS.whatsapp}`

  return {
    ...BUSINESS_DETAILS,
    telLink,
    whatsappLink
  }
}
