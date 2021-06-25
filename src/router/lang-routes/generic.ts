import { html } from 'lit';
import type { Routes } from 'universal-router';
import { fint } from '../../i18n/i18n.js';
import { getPathsTranslations, pt, tc } from '../../i18n/utils.js';
import type { NpRouteResult } from '../routes.js';

// export async function getPathTranslations(ids: string[], langs?: string[]) {
//   const languages = langs || fint.langs;
//   await Promise.all(languages?.map(l => fint.loadResource(l, 'paths')));

// }

export async function getGenericLangRoutes(lang: string) {
  await Promise.all(fint.langs.map(l => fint.loadResource(l, 'paths')));

  const paths = ['docs', 'tutorial', 'blog'];
  const translations = getPathsTranslations(paths, fint.langs);

  const routes: Routes<NpRouteResult> = [
    { path: '', action: () => ({ main: html`♡ ${lang} ♡` }) },

    {
      path: `/${pt('docs')}`,
      action: () => ({
        // Change to something like: html`<docs-component></docs-component>`
        main: html`** ${tc('docs')} **`,
        meta: { translations: translations.docs },
      }),
    },
    {
      path: `/${pt('tutorial')}`,
      action: () => ({
        // Change to something like: html`<tutorial-component></tutorial-component>`
        main: html`-- ${tc('tutorial')} --`,
        meta: { translations: translations.tutorial },
      }),
    },
    {
      path: `/${pt('blog')}`,
      action: () => ({
        // Change to something like: html`<blog-component></blog-component>`
        main: html`|| ${tc('blog')} ||`,
        meta: { translations: translations.blog },
      }),
    },
  ];

  return routes;
}
