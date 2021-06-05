import type { TopNav } from '@spectrum-web-components/top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { router } from '../../router';

@customElement('np-top-nav')
export class NpTopNav extends LitElement {
  @query('sp-top-nav')
  spTopNav: TopNav | undefined;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('route-change', this.routeChangeHandler);
    window.addEventListener('popstate', this.routeChangeHandler);
    window.addEventListener('load', this.routeChangeHandler);
  }

  disconnectedCallback() {
    window.removeEventListener('route-change', this.routeChangeHandler);
    window.removeEventListener('popstate', this.routeChangeHandler);
    window.removeEventListener('load', this.routeChangeHandler);
    super.disconnectedCallback();
  }

  private routeChangeHandler = () => {
    if (this.spTopNav) this.spTopNav.selected = window.location.href;
  };

  updated() {
    router.updatePageLinks(this.renderRoot);
  }

  render() {
    return html`<sp-top-nav>
      <slot name="side-nav-toggle"></slot>

      <sp-top-nav-item href="" value="Home" data-navigo>Home</sp-top-nav-item>
      <sp-top-nav-item href="blog" value="Blog" data-navigo
        >Blog</sp-top-nav-item
      >

      <slot name="theme-manager"></slot>
    </sp-top-nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-top-nav': NpTopNav;
  }
}
