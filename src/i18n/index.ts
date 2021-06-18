import type { FluentVariable } from '@fluent/bundle';
import conf from './conf.js';
import { Fint } from './fint.js';

export const fint = new Fint(conf);

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

// Capitalize.
export function c(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Translate and capitalize.
export function tc(...args: Parameters<typeof t>) {
  return c(t(...args));
}
