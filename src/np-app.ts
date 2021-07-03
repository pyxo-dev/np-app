import 'carbon/layout.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import 'src/np/np-full-page-loader.js';
import { fint } from './i18n/i18n.js';

@customElement('np-app')
export class NpApp extends LitElement {
  render() {
    return fint.ready
      ? html`<cc-layout></cc-layout>`
      : html`<np-full-page-loader></np-full-page-loader>`;
  }

  constructor() {
    super();
    fint.initComplete.then(() => this.requestUpdate());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-app': NpApp;
  }
}
