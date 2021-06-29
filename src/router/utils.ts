export function goto(href: string) {
  const { origin } = window.location;

  const oldPath = window.location.href.replace(origin, '');

  const _newPath = href.replace(origin, '');
  const newPath = _newPath.startsWith('/') ? _newPath : `/${_newPath}`;

  if (newPath === oldPath) return;

  window.history.pushState({}, '', newPath);

  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function handleLink(e: Event) {
  if ((e as KeyboardEvent).ctrlKey || (e as KeyboardEvent).metaKey) return;

  const composedPath = e.composedPath();
  const currentTargetIdx = composedPath.findIndex(el => el === e.currentTarget);

  type Link = EventTarget & { href?: string; target?: string };

  const link: Link | undefined = composedPath
    .slice(0, currentTargetIdx + 1)
    .find(el => (el as Link).href !== undefined);

  if (!link || link?.target === '_blank') return;

  e.preventDefault();

  goto(link.href as string);
}
