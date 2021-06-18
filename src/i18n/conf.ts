import type { FintConf } from './fint.js';

export default <FintConf>{
  langs: ['ar', 'en', 'tr'],
  langsConf: {
    ar: {
      nativeName: 'العربية',
      dir: 'rtl',
    },

    en: {
      nativeName: 'English',
    },

    tr: {
      nativeName: 'Türkçe',
    },
  },
};
