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

  ready = false;

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

    this.initLang(this.lang).then(lng => {
      if (lng) {
        this.ready = true;
        window.dispatchEvent(new Event('np:i18n:fintready'));
      }
    });

    window.addEventListener('np:i18n:langselection', this._handleLangSelection);
  }

  async initLang(lang: string) {
    if (!this._isLangValid(lang)) return undefined;

    const detail = { id: `load lang resources: ${lang}` };
    window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
    // await new Promise(r => setTimeout(r, 1500));
    await this.loadLangResources(lang);
    window.dispatchEvent(new CustomEvent('np:progressend', { detail }));

    this.lang = lang;

    document.documentElement.lang = this.lang;
    document.dir = this.dir();

    return lang;
  }

  async changeLang(lang: string) {
    if (lang === this.lang) return lang;

    const oldDir = this.dir();

    const result = await this.initLang(lang);
    if (!result) return undefined;

    window.dispatchEvent(new Event('np:i18n:langchange'));
    if (oldDir !== this.dir()) {
      window.dispatchEvent(new Event('np:i18n:dirchange'));
    }

    return lang;
  }

  private _handleLangSelection = async (e: CustomEvent) => {
    if (await this.changeLang(e.detail.lang)) {
      window.localStorage.setItem(LS_LANG_KEY, this.lang);
    }
  };

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
    if (!this._isLangValid(lang)) return undefined;

    const results = await Promise.allSettled(
      this.activeNamespaces.map(ns => this.loadResource(lang, ns))
    );

    for (const result of results) {
      if (result.status === 'rejected') {
        console.error('Error loading resource: ', result.reason);
      }
    }
    return lang;
  }

  async loadResource(lang: string, namespace = 'global') {
    if (!this._isLangValid(lang)) return undefined;
    if (!namespace) {
      console.error('The provided namespace cannot be empty.');
      return undefined;
    }

    if (this.loadedResources[namespace]?.includes(lang)) return lang;

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

      return lang;
    } catch (err) {
      console.error('Error loading resource: ', err);
      return undefined;
    }
  }

  dir(lang = this.lang) {
    return this.langsConf?.[lang]?.dir || 'ltr';
  }

  nativeName(lang = this.lang) {
    return this.langsConf?.[lang]?.nativeName || lang;
  }

  private _isLangValid(lang: string) {
    if (!this.langs.includes(lang)) {
      console.error('The provided language is not in the app language list.');
      return false;
    }
    return true;
  }
}

declare global {
  interface WindowEventMap {
    'np:i18n:langselection': CustomEvent;
  }
}
