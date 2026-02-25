export const useSiteConfigStore = defineStore('siteConfig', {
  state: () => ({
    businessName: 'Beasylink Projects',
    phone: '+27 72 345 6789',
    whatsapp: '27723456789',
    email: 'info@beasylink-projects.co.za',
    serviceAreas: [
      'Witbank',
      'Emalahleni',
      'Tasbet Park',
      'Reyno Ridge',
      'Ben Fleur',
      'Klipfontein'
    ],
    openingHours: 'Mon-Sat: 07:00-18:00',
    primaryServices: [
      'Welding & metal fabrication',
      'Plumbing repairs and installation',
      'Construction and property repairs'
    ],
    socialLinks: {
      facebook: '',
      instagram: ''
    }
  }),
  getters: {
    whatsappLink: (state) => `https://wa.me/${state.whatsapp}`,
    telLink: (state) => `tel:${state.phone.replace(/\s/g, '')}`
  }
})
