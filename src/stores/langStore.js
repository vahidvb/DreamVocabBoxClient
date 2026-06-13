import { defineStore } from 'pinia'

const RTL_LANGS = ['fa-IR', 'ar-SA']

export const useLangStore = defineStore('lang', {
  state: () => ({
    locale: localStorage.getItem('lang') || 'en-GB',
    languages: [
      { code: 'fa-IR', title: 'فارسی' },
      { code: 'en-GB', title: 'English' },
      { code: 'ar-SA', title: 'العربية' },
      { code: 'tr-TR', title: 'Türkçe' },
      { code: 'ru-RU', title: 'Русский' },
      { code: 'hi-IN', title: 'हिन्दी' },
      { code: 'zh-CN', title: '中文' },
      { code: 'fr-FR', title: 'Français' },
      { code: 'de-DE', title: 'Deutsch' },
      { code: 'es-ES', title: 'Español' }
    ]
  }),

  getters: {
    isRtl: (state) => RTL_LANGS.includes(state.locale),

    prevIcon: (state) =>
      RTL_LANGS.includes(state.locale)
        ? 'mdi-chevron-right'
        : 'mdi-chevron-left',

    nextIcon: (state) =>
      RTL_LANGS.includes(state.locale)
        ? 'mdi-chevron-left'
        : 'mdi-chevron-right',

    currentLangTitle: (state) =>
      state.languages.find(lang => lang.code === state.locale)?.title || 'English'
  },

  actions: {
    setLocale(locale) {
      this.locale = locale
      localStorage.setItem('lang', locale)
      document.documentElement.dir = RTL_LANGS.includes(locale) ? 'rtl' : 'ltr'
    },

    applyLanguage(lang, i18n, vuetify) {
      this.setLocale(lang)

      if (i18n) {
        i18n.locale = lang
      }

      if (vuetify) {
        vuetify.locale.current = lang
      }
    },

    initLanguage(i18n, vuetify) {
      this.applyLanguage(this.locale, i18n, vuetify)
    }
  }
})
