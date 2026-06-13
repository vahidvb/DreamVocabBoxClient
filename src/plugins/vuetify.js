import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { fa, en, ar, zhHans, es, fr, de, tr, ru } from 'vuetify/locale'

export default createVuetify({
  components,
  directives,
  ssr: true,

  locale: {
    locale: localStorage.getItem('lang') || 'en-GB',
    fallback: 'en-GB',

    messages: {
      'en-GB': en,
      'fa-IR': fa,
      'ar-SA': ar,
      'zh-CN': zhHans,
      'es-ES': es,
      'fr-FR': fr,
      'de-DE': de,
      'tr-TR': tr,
      'ru-RU': ru,
    },


    rtl: {
      'fa-IR': true,
      'ar-SA': true,
      'hi-IN': false,
    },
  },

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
