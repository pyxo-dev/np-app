import type { SideNavItem } from '@spectrum-web-components/sidenav';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import { html, LitElement } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { handleSpaLink } from '../../router';

@customElement('np-side-nav')
export class NpSideNav extends LitElement {
  @queryAll('sp-sidenav-item')
  sideNavItems: NodeListOf<SideNavItem> | undefined;

  constructor() {
    super();
    this.updateComplete.then(() => {
      this.handleRouteChange();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouteChange);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.handleRouteChange);
    super.disconnectedCallback();
  }

  private handleRouteChange = () => {
    if (!this.sideNavItems) return;
    const path = window.location.href.replace(window.location.origin, '');
    const activeItem = Array.from(this.sideNavItems).find(i => i.href === path);
    activeItem?.click();
  };

  render() {
    return html`
      <sp-sidenav @click=${handleSpaLink} manage-tab-index defaultValue="Docs">
        <sp-sidenav-item
          value="Docs"
          label="Docs"
          href="/docs"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Guides"
          label="Guides"
          href="/guides"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Community"
          label="Community"
          href="/community"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Releases"
          label="Releases"
          href="/release"
          target="_blank"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="About"
          label="About"
          href="/about"
        ></sp-sidenav-item>
        <sp-sidenav-item value="Home" label="Home" href="/"></sp-sidenav-item>
        <sp-sidenav-item
          value="Blog"
          label="Blog"
          href="/blog"
        ></sp-sidenav-item>
      </sp-sidenav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-side-nav': NpSideNav;
  }
}
