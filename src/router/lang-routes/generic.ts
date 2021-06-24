import { html } from 'lit';
import type { Routes } from 'universal-router';
import { fint } from '../../i18n/i18n.js';
import { pt, tc } from '../../i18n/utils';
import type { NpLayoutParts } from '../routes.js';

export async function getGenericLangRoutes(lang: string) {
  await fint.loadResource(lang, 'paths');

  const routes: Routes<NpLayoutParts> = [
    { path: '', action: () => ({ main: html`♡ ${lang} ♡` }) },
    {
      path: `/${pt('docs')}`,
      action: () => ({ main: html`${tc('docs')}` }),
    },
    {
      path: `/${pt('tutorial')}`,
      action: () => ({ main: html`${tc('tutorial')}` }),
    },
    {
      path: `/${pt('blog')}`,
      action: () => ({ main: html`${tc('blog')}` }),
    },
  ];

  return routes;
}
