import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './np-theme';

@customElement('np-app')
export class NpApp extends LitElement {
  render() {
    return html`<np-theme></np-theme>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-app': NpApp;
  }
}
