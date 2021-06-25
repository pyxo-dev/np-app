import { getGenericLangRoutes } from './generic.js';

export async function getLangRoutes() {
  const routes = getGenericLangRoutes('ar');
  // Customize routes if needed, or remove the above line and build the routes
  // from scratch.

  return routes;
}
