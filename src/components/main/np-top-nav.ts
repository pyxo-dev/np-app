import '@spectrum-web-components/action-button/sp-action-button';
import '@spectrum-web-components/top-nav/sp-top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item';
import { customElement, html, LitElement } from 'lit-element';

@customElement('np-top-nav')
export class NpTopNav extends LitElement {
  render() {
    return html`
      <sp-top-nav>
        <sp-action-button quiet label="Open Navigation">☰</sp-action-button>
        <sp-top-nav-item href="#home">Home</sp-top-nav-item>
        <sp-top-nav-item href="#blog">Blog</sp-top-nav-item>
      </sp-top-nav>
    `;
  }
}
