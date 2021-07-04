import type { FluentVariable } from '@fluent/bundle';
import { fint } from './i18n.js';

/*
 * Translate.
 */
export function t(
  id: string,
  args?: Record<string, FluentVariable> | null,
  namespace = 'global',
  lang?: string,
  errors?: Array<Error> | null
) {
  const bundle = fint.bundles[namespace]?.[lang || fint.lang];
  const message = bundle?.getMessage(id);
  if (message?.value) return bundle.formatPattern(message.value, args, errors);
  console.warn('Missing id: ', id);
  return '';
}

/*
 * Capitalize.
 */
export function c(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
 * Translate and capitalize.
 */
export function tc(...args: Parameters<typeof t>) {
  return c(t(...args));
}

export function translatePathSegment(
  segment: string,
  lang?: string,
  args?: Record<string, FluentVariable> | null,
  errors?: Array<Error> | null
) {
  return encodeURI(t(segment, args, 'paths', lang, errors));
}

/**
 * Path translate.
 */
export function pt(path: string, lang?: string) {
  const translatedSegments = path
    .split('/')
    .map(segment => translatePathSegment(segment, lang));

  if (translatedSegments.includes('')) return '';

  return translatedSegments.join('/');
}

export function p(path: string, lang?: string) {
  return `/${lang || fint.lang}/${pt(path, lang)}`;
}

export function getPathTranslations(path: string, langs?: string[]) {
  const languages = langs || fint.langs;

  const translations: Record<string, string> = {};

  for (const lang of languages) {
    const translation = pt(path, lang);
    if (translation) translations[lang] = translation;
  }

  return translations;
}

export interface NpPathsTranslations {
  [path: string]: {
    [lang: string]: string;
  };
}

export function getPathsTranslations(paths: string[], langs?: string[]) {
  const pathsTranslations: NpPathsTranslations = {};
  for (const path of paths) {
    pathsTranslations[path] = getPathTranslations(path, langs);
  }
  return pathsTranslations;
}
