import 'carbon/banner.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('cc-default-main')
export class CcDefaultMain extends LitElement {
  render() {
    return html`<cc-banner><h1>Test Heading</h1></cc-banner>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-default-main': CcDefaultMain;
  }
}
