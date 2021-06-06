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
      <sp-sidenav manage-tab-index defaultValue="Docs">
        <sp-sidenav-item
          value="Docs"
          label="Docs"
          href="/docs"
          @click=${handleSpaLink}
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Guides"
          label="Guides"
          href="/guides"
          @click=${handleSpaLink}
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Community"
          label="Community"
          href="/community"
          @click=${handleSpaLink}
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Releases"
          label="Releases"
          href="/release"
          target="_blank"
          disabled
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="About"
          label="About"
          href="/about"
          @click=${handleSpaLink}
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Home"
          label="Home"
          href="/"
          @click=${handleSpaLink}
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Blog"
          label="Blog"
          href="/blog"
          @click=${handleSpaLink}
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
