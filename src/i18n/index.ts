import type { FluentVariable } from '@fluent/bundle';
import conf from './conf.js';
import { Fint } from './fint.js';

export const fint = new Fint(conf);

export function t(
  id: string,
  namespace = 'global',
  locale?: string,
  args?: Record<string, FluentVariable> | null,
  errors?: Array<Error> | null
) {
  const bundle = fint.bundles[namespace][locale || fint.locale];
  const message = bundle.getMessage(id);
  if (message?.value) return bundle.formatPattern(message.value, args, errors);
  console.warn('[i18n t] Missing id: ', id);
  return '';
}
