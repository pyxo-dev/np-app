import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './np/np-lang.js';

@customElement('np-app')
export class NpApp extends LitElement {
  render() {
    return html`<np-lang></np-lang>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-app': NpApp;
  }
}
