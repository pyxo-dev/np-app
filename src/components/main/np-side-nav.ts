import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router } from '../../router';

@customElement('np-side-nav')
export class NpSideNav extends LitElement {
  firstUpdated() {
    const sideNavItems = this.renderRoot.querySelectorAll('sp-sidenav-item');
    if (sideNavItems) {
      const routeChangeHandler = () => {
        sideNavItems.forEach(item => {
          const i = item;
          i.selected =
            i.href === window.location.href.replace(window.location.origin, '');
        });
      };
      window.addEventListener('route-change', routeChangeHandler);
      window.addEventListener('popstate', routeChangeHandler);
      window.addEventListener('load', routeChangeHandler);
    }
  }

  updated() {
    router.updatePageLinks(this.renderRoot);
  }

  render() {
    return html`
      <sp-sidenav manage-tab-index defaultValue="Docs">
        <sp-sidenav-item
          value="Docs"
          label="Docs"
          href="/docs"
          data-navigo
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Guides"
          label="Guides"
          href="/guides"
          data-navigo
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Community"
          label="Community"
          href="/community"
          data-navigo
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
          data-navigo
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Home"
          label="Home"
          href="/"
          data-navigo
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Blog"
          label="Blog"
          href="/blog"
          data-navigo
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
