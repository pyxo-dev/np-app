import { FluentBundle } from '@fluent/bundle';

export interface FintLangConf {
  nativeName?: string;
  dir?: 'rtl' | 'ltr';
}

export interface FintConf {
  langs: [string, ...string[]];
  langsConf?: Record<string, FintLangConf>;
}

export interface FintBundles {
  [namespace: string]: Record<string, FluentBundle>;
}

export interface FintLoadedResources {
  [namespace: string]: string[];
}

// Local storage key to use for saving the app language.
const LS_LANG_KEY = 'np:lang';

export class Fint {
  conf;

  langs;

  langsConf;

  lang;

  bundles: FintBundles = {};

  loadedResources: FintLoadedResources = {};

  activeNamespaces = ['global'];

  constructor(conf: FintConf, lang?: string) {
    // Validation
    if (conf.langs.includes('')) {
      throw new Error('The language list cannot contain an empty string.');
    }

    if (conf.langs.length !== new Set(conf.langs).size) {
      throw new Error('The language list cannot contain duplicates.');
    }

    if (lang && !conf.langs.includes(lang)) {
      console.warn(
        'The provided language is not in the app language list and will be ignored.'
      );
    }

    this.conf = conf;
    this.langs = conf.langs;
    this.langsConf = conf.langsConf;
    this.lang =
      lang && conf.langs.includes(lang) ? lang : this.getInitialLang();

    window.localStorage.setItem(LS_LANG_KEY, this.lang);
  }

  async changeLang(lang: string) {
    if (lang === this.lang || !this._isLangValid(lang)) return this;

    await this.loadLangResources(lang);

    this.lang = lang;
    window.localStorage.setItem(LS_LANG_KEY, lang);
    return this;
  }

  getInitialLang() {
    const prefixLang = window.location.pathname.split('/')[1].toLowerCase();
    if (prefixLang) {
      const lang = this.langs.find(l => l.toLowerCase() === prefixLang);
      if (lang) return lang;
    }

    const localStorageLang = window.localStorage.getItem(LS_LANG_KEY);
    if (localStorageLang && this.langs.includes(localStorageLang)) {
      return localStorageLang;
    }

    return this.langs[0];
  }

  async loadLangResources(lang: string) {
    if (!this._isLangValid(lang)) return this;

    await Promise.all(
      this.activeNamespaces.map(ns => this.loadResource(lang, ns))
    );
    return this;
  }

  async loadResource(lang: string, namespace = 'global') {
    if (!this.langs.includes(lang)) {
      console.error('The provided language is not in the app language list.');
      return this;
    }
    if (!namespace) {
      console.error('The provided namespace cannot be empty.');
      return this;
    }

    if (this.loadedResources[namespace]?.includes(lang)) return this;

    if (!this.bundles[namespace]) {
      this.bundles[namespace] = {};
      this.langs.forEach(l => {
        this.bundles[namespace][l] = new FluentBundle(l);
      });
    }

    try {
      const { default: resource } = await import(
        `./msgs/${namespace}/${lang}.js`
      );
      const errors = this.bundles[namespace][lang].addResource(resource);
      if (errors.length) {
        errors.forEach(err => console.warn('Error adding resource: ', err));
      }

      if (!this.loadedResources[namespace]) {
        this.loadedResources[namespace] = [];
      }
      this.loadedResources[namespace].push(lang);
    } catch (err) {
      console.error('Error loading resource: ', err);
    }
    return this;
  }

  dir() {
    return this.langsConf?.[this.lang]?.dir || 'ltr';
  }

  nativeName() {
    return this.langsConf?.[this.lang]?.nativeName || this.lang;
  }

  private _isLangValid(lang: string) {
    if (!this.langs.includes(lang)) {
      console.error('The provided language is not in the app language list.');
      return false;
    }
    return true;
  }
}
