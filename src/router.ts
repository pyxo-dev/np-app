import Navigo from 'navigo';
import { parseNavigateOptions, windowAvailable } from 'navigo/lib/es/utils';

const DEFAULT_LINK_SELECTOR = '[data-navigo]';
const isWindowAvailable = windowAvailable();

type NpNavigo = Navigo & {
  updatePageLinks: (
    element: Element | Document | DocumentFragment | undefined
  ) => Navigo;
};

interface NavigoLink extends Element {
  hasListenerAttached: boolean;
  navigoHandler: EventListener;
}

export const router: NpNavigo = new Navigo('/');

router.updatePageLinks = function updatePageLinks(
  element: Element | Document | DocumentFragment = document
): Navigo {
  const self = this;

  if (!isWindowAvailable) return self;

  const links: NodeListOf<NavigoLink> = element.querySelectorAll(
    DEFAULT_LINK_SELECTOR
  );

  links.forEach(l => {
    const link = l;
    if (
      link.getAttribute('data-navigo') === 'false' ||
      link.getAttribute('target') === '_blank'
    ) {
      if (link.hasListenerAttached) {
        link.removeEventListener('click', link.navigoHandler);
      }
      return;
    }
    if (!link.hasListenerAttached) {
      link.hasListenerAttached = true;
      link.navigoHandler = e => {
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
          const u = new URL(location);
          location = u.pathname + u.search;
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
        return undefined;
      };
      link.addEventListener('click', link.navigoHandler);
    }
  });
  return self;
};
