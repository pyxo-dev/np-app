import 'carbon/breadcrumb.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('cc-banner')
export class CcBanner extends LitElement {
  render() {
    return html`<cc-breadcrumb></cc-breadcrumb><slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-banner': CcBanner;
  }
}
