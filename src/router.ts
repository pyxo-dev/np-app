import Navigo from 'navigo';
import { parseNavigateOptions, windowAvailable } from 'navigo/lib/es/utils';

const DEFAULT_LINK_SELECTOR = '[data-navigo]';
const isWindowAvailable = windowAvailable();

type NpNavigo = Navigo & {
  updatePageLinks: (
    element: Element | Document | DocumentFragment | undefined
  ) => Navigo;
};

export const router: NpNavigo = new Navigo('/');

router.updatePageLinks = function (
  element: Element | Document | DocumentFragment = document
): Navigo {
  let self = this;

  if (!isWindowAvailable) return self;

  const links: NodeListOf<NavigoLink> = element.querySelectorAll(
    DEFAULT_LINK_SELECTOR
  );

  links.forEach(link => {
    if (
      'false' === link.getAttribute('data-navigo') ||
      '_blank' === link.getAttribute('target')
    ) {
      if (link.hasListenerAttached) {
        link.removeEventListener('click', link.navigoHandler);
      }
      return;
    }
    if (!link.hasListenerAttached) {
      link.hasListenerAttached = true;
      link.navigoHandler = function (e) {
        if (
          ((<KeyboardEvent>e).ctrlKey || (<KeyboardEvent>e).metaKey) &&
          (e.target as HTMLElement)?.tagName.toLowerCase() === 'a'
        ) {
          return false;
        }
        let location = link.getAttribute('href');
        if (typeof location === 'undefined' || location === null) {
          return false;
        }
        // handling absolute paths
        if (location.match(/^(http|https)/) && typeof URL !== 'undefined') {
          try {
            const u = new URL(location);
            location = u.pathname + u.search;
          } catch (err) {}
        }
        const options = parseNavigateOptions(
          link.getAttribute('data-navigo-options')
        );

        if (!self.destroyed) {
          e.preventDefault();
          const oldHref = window.location.href;
          self.navigate(self._clean(location), options);
          const newHref = window.location.href;

          if (newHref !== oldHref) {
            const routeChangeEvent = new CustomEvent('route-change', {
              bubbles: true,
              composed: true,
              detail: { location },
            });
            link.dispatchEvent(routeChangeEvent);
          }
        }
      };
      link.addEventListener('click', link.navigoHandler);
    }
  });
  return self;
};
