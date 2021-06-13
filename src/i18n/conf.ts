import type { FintConf } from './fint.js';

export default <FintConf>{
  locales: ['ar', 'en'],
  localesConf: {
    ar: {
      nativeName: 'العربية',
      rtl: true,
    },

    en: {
      nativeName: 'English',
    },
  },
};
