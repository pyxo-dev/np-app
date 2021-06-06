import { html } from 'lit';
import type { Routes } from 'universal-router';
import UniversalRouter from 'universal-router';

const routes: Routes = [
  { path: '', action: () => ({ main: html`Home ...` }) },
  { path: '/blog', action: () => ({ main: html`Blog ...` }) },
  { path: '/docs', action: () => ({ main: html`Docs ...` }) },
  { path: '/guides', action: () => ({ main: html`Guides ...` }) },
  { path: '/:other', action: () => ({ main: html`Other ...` }) },
];

export const router = new UniversalRouter(routes);

export function handleSpaLink(e: Event) {
  if ((e as KeyboardEvent).ctrlKey || (e as KeyboardEvent).metaKey) return;

  if (!e.target) return;

  const linkElement: EventTarget & { href?: string; target?: string } =
    e.target;
  if (linkElement.target === '_blank') return;

  e.preventDefault();

  const oldHref = window.location.href.replace(window.location.origin, '');
  const newHref = linkElement.href;
  if (newHref === undefined || newHref === oldHref) return;

  window.history.pushState({}, '', newHref);

  linkElement.dispatchEvent(
    new PopStateEvent('popstate', { bubbles: true, composed: true })
  );
}
