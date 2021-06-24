import { html, TemplateResult } from 'lit';
import type { Routes } from 'universal-router';
import { fint } from '../i18n/i18n.js';

export interface NpLayoutParts {
  header?: TemplateResult;
  main?: TemplateResult;
  footer?: TemplateResult;
}

function getRootChildren() {
  const rootChildren: Routes<NpLayoutParts> = [
    { path: '', action: () => ({ main: html`Welcome | مرحبا` }) },
  ];

  fint.langs.forEach(lang => {
    rootChildren.push({
      path: `/${lang}`,
      children: [],
      action: async context => {
        let children: Routes<NpLayoutParts> = [];
        try {
          const { getLangRoutes } = await import(`./lang-routes/${lang}.js`);
          children = await getLangRoutes();
        } catch (_err) {
          const { getGenericLangRoutes } = await import(
            './lang-routes/generic.js'
          );
          children = await getGenericLangRoutes(lang);
        }

        context.route.children = children;
        delete context.route.action;
        return context.next();
      },
    });
  });

  return rootChildren;
}

export const routes: Routes<NpLayoutParts> = [
  {
    path: '/',
    children: getRootChildren(),
  },

  {
    path: '(.*)',
    action: () => ({
      main: html`<h1>404</h1>`,
      header: html``,
      footer: html``,
    }),
  },
];
