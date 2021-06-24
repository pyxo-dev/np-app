export function goto(href: string) {
  const oldHref = window.location.href.replace(window.location.origin, '');
  const newHref = href.startsWith('/') ? href : `/${href}`;

  if (newHref === oldHref) return;

  window.history.pushState({}, '', newHref);

  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function handleLink(e: Event) {
  if ((e as KeyboardEvent).ctrlKey || (e as KeyboardEvent).metaKey) return;

  if (!e.target) return;

  const link: EventTarget & { href?: string; target?: string } = e.target;
  if (link.href === undefined || link.target === '_blank') return;

  e.preventDefault();

  goto(link.href);
}
