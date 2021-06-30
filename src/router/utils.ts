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
  const currentTargetTree = composedPath.slice(0, currentTargetIdx + 1);

  type Link = Partial<Element> & { href?: string; target?: string };

  let link: Link | undefined = currentTargetTree.find(
    el => typeof (el as Link).getAttribute?.('href') === 'string'
  );

  if (link) {
    if (
      link.getAttribute?.('target') === '_blank' ||
      link.target === '_blank'
    ) {
      return;
    }

    e.preventDefault();
    goto(link.getAttribute?.('href') as string);
    return;
  }

  link = currentTargetTree.find(el => typeof (el as Link).href === 'string');

  if (link) {
    if (
      link.target === '_blank' ||
      link.getAttribute?.('target') === '_blank'
    ) {
      return;
    }

    e.preventDefault();
    goto(link.href as string);
  }
}
