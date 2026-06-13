import { createI18n } from 'vue-i18n'

import enGB from './locales/en-GB'
import faIR from './locales/fa-IR'
import arSA from './locales/ar-SA'
import zhCN from './locales/zh-CN'
import hiIN from './locales/hi-IN'
import esES from './locales/es-ES'
import frFR from './locales/fr-FR'
import deDE from './locales/de-DE'
import trTR from './locales/tr-TR'
import ruRU from './locales/ru-RU'

const messages = {
  'en-GB': enGB,
  'fa-IR': faIR,
  'ar-SA': arSA,
  'zh-CN': zhCN,
  'hi-IN': hiIN,
  'es-ES': esES,
  'fr-FR': frFR,
  'de-DE': deDE,
  'tr-TR': trTR,
  'ru-RU': ruRU,
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en-GB',
  fallbackLocale: 'en-GB',
  messages,
})

export default i18n
