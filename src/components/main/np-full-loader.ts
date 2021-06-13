import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import styles from './np-full-loader.css.js';

@customElement('np-full-loader')
export class NpFullLoader extends LitElement {
  static styles = styles;

  render() {
    return html`<div id="spinner"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-full-loader': NpFullLoader;
  }
}
