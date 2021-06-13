import { FluentBundle } from '@fluent/bundle';

export interface FintLocaleConf {
  nativeName?: string;
  rtl?: boolean;
}

export interface FintConf {
  locales: [string, ...string[]];
  localesConf?: Record<string, FintLocaleConf>;
}

export interface FintBundles {
  [namespace: string]: Record<string, FluentBundle>;
}

export interface FintLoadedResources {
  [namespace: string]: string[];
}

export class Fint {
  conf;
  locales;
  locale;
  bundles: FintBundles = {};
  loadedResources: FintLoadedResources = {};
  activeNamespaces = ['global'];

  constructor(conf: FintConf, locale?: string) {
    // Validation
    if (conf.locales.includes('')) {
      throw `
[Fint] The locales list cannot contain an empty string.
`;
    }

    if (conf.locales.length !== new Set(conf.locales).size) {
      throw `
[Fint] The locales list cannot contain duplicates.
`;
    }

    if (locale && !conf.locales.includes(locale)) {
      console.warn(`
[Fint] The provided locale is not in the app locales list and will be ignored.
`);
    }

    this.conf = conf;
    this.locales = conf.locales;
    if (locale && conf.locales.includes(locale)) {
      this.locale = locale;
    } else {
      this.locale = this.getInitialLocale();
    }
    window.localStorage.setItem('locale', this.locale);

    this.setLocale(this.locale);
  }

  async setLocale(locale: string) {
    if (!this.locales.includes(locale)) {
      console.error(`
[Fint setLocale] The provided locale is not in the app locales list.
`);
      return this;
    }

    await Promise.all(
      this.activeNamespaces.map(ns => this.loadResource(locale, ns))
    );
    this.locale = locale;
    window.dispatchEvent(new Event('locale-set'));
    window.localStorage.setItem('locale', this.locale);
    return this;
  }

  getInitialLocale() {
    const prefixLocale = window.location.pathname.split('/')[1].toLowerCase();
    if (prefixLocale) {
      const locale = this.locales.find(l => l.toLowerCase() === prefixLocale);
      if (locale) return locale;
    }

    const localStorageLocale = window.localStorage.getItem('locale');
    if (localStorageLocale && this.locales.includes(localStorageLocale)) {
      return localStorageLocale;
    }

    return this.locales[0];
  }

  async loadResource(locale: string, namespace = 'global') {
    if (!this.locales.includes(locale)) {
      console.error(`
[Fint loadResource] The provided locale is not in the app locales list.
`);
      return;
    }
    if (!namespace) {
      console.error(`
[Fint loadResource] The provided namespace cannot be empty.
`);
      return;
    }

    if (this.loadedResources[namespace]?.includes(locale)) return;

    if (!this.bundles[namespace]) {
      this.bundles[namespace] = {};
      this.locales.forEach(l => {
        this.bundles[namespace][l] = new FluentBundle(l);
      });
    }

    window.dispatchEvent(new Event('start-progress'));
    // await new Promise(r => setTimeout(r, 1000));
    try {
      const { default: resource } = await import(
        `./messages/${namespace}/${locale}.js`
      );
      const errors = this.bundles[namespace][locale].addResource(resource);
      if (errors?.length) {
        errors.forEach(e =>
          console.warn('[Fint loadResource] Error adding resource: ', e)
        );
      }

      if (!this.loadedResources[namespace]) {
        this.loadedResources[namespace] = [];
      }
      this.loadedResources[namespace].push(locale);
    } catch (e) {
      console.error('[Fint loadResource] Error loading resource: ', e);
    }
    window.dispatchEvent(new Event('stop-progress'));
  }
}
