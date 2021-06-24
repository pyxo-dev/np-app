import { html } from 'lit';
import { getGenericLangRoutes } from './generic.js';

export async function getLangRoutes() {
  const routes = await getGenericLangRoutes('en');

  const entryRoute = routes.find(route => route.path === '');
  if (entryRoute) entryRoute.action = () => ({ main: html`♡ English ♡` });

  return routes;
}
