import { html } from 'lit';
import type { Routes } from 'universal-router';
import { fint } from '../../i18n/i18n.js';
import { getPathsTranslations, pt, tc } from '../../i18n/utils.js';
import '../../spectrum/blog/sc-blog-post-lc-list.js';
import '../../spectrum/main/sc-page.js';
import type { NpRouteResult } from '../routes.js';

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
      action: async () => ({
        main: html`
          <sc-page>
            <sc-blog-post-lc-list></sc-blog-post-lc-list>
          </sc-page>
        `,
        meta: { translations: translations.blog },
      }),
    },
  ];

  return routes;
}
