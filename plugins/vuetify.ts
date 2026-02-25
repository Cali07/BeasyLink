import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#0d47a1',
            secondary: '#f57f17'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
