import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './spectrum/theme/sc-theme.js';

@customElement('np-app')
export class NpApp extends LitElement {
  render() {
    return html`<sc-theme></sc-theme>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-app': NpApp;
  }
}
