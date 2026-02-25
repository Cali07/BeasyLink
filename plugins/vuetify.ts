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
            primary: '#1f3a5f',
            secondary: '#ff8a1f',
            accent: '#ffb347',
            info: '#2563eb',
            success: '#1f8a4c',
            warning: '#f59e0b'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
