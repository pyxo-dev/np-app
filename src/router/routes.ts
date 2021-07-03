import { html, TemplateResult } from 'lit';
import type { Routes } from 'universal-router';
import { fint } from '../i18n/i18n.js';

export interface NpRouteMeta {
  translations?: Record<string, string>;
}

export interface NpRouteResult {
  header?: TemplateResult | (() => TemplateResult);
  sideNav?: TemplateResult | (() => TemplateResult);
  main?: TemplateResult | (() => TemplateResult);
  footer?: TemplateResult | (() => TemplateResult);
  meta?: NpRouteMeta;
}

function getRootChildren() {
  const rootChildren: Routes<NpRouteResult> = [
    {
      path: '',
      action: () => ({}),
    },
  ];

  for (const lang of fint.langs) {
    rootChildren.push({
      path: `/${lang}`,
      children: [],
      action: async context => {
        let children: Routes<NpRouteResult> = [];
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
  }

  return rootChildren;
}

export const routes: Routes<NpRouteResult> = [
  {
    path: '/',
    children: getRootChildren(),
  },

  {
    path: '(.*)',
    action: () => ({
      header: html``,
      sideNav: html``,
      main: html`<h1>404</h1>`,
      footer: html``,
    }),
  },
];
