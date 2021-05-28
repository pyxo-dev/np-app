import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import { customElement, html, LitElement } from 'lit-element';

@customElement('np-side-nav')
export class NpSideNav extends LitElement {
  render() {
    return html`
      <sp-sidenav manage-tab-index defaultValue="Docs">
        <sp-sidenav-item
          value="Docs"
          label="Docs"
          href="#docs"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Guides"
          label="Guides"
          href="#guides"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Community"
          label="Community"
          href="#community"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Storybook"
          label="Storybook"
          href="#storybook"
          target="_blank"
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="Releases"
          label="Releases"
          href="#release"
          target="_blank"
          disabled
        ></sp-sidenav-item>
        <sp-sidenav-item
          value="GitHub"
          label="GitHub"
          href="#github"
          target="_blank"
        ></sp-sidenav-item>
      </sp-sidenav>
    `;
  }
}
