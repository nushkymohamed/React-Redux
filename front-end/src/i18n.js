import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEng from './locales/en/translation.json';
import translationGer from './locales/ger/translation.json';
import translationFre from './locales/fre/translation.json';
import translationHin from './locales/hin/translation.json';
import translationJap from './locales/jap/translation.json';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: translationEng,
    },
    ger: {
      translations: translationGer,
    },
    fre: {
      translations: translationFre,
    },
    hin: {
      translations: translationHin,
    },
    jap: {
      translations: translationJap,
    },
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
