import { html } from 'lit';
import { getGenericLangRoutes } from './generic.js';

export async function getLangRoutes() {
  const routes = await getGenericLangRoutes('en');

  const entryRoute = routes.find(route => route.path === '');
  if (entryRoute)
    entryRoute.action = () => ({
      main: html`<main id="main" tabindex="0">♡ English ♡</main>`,
    });

  return routes;
}
