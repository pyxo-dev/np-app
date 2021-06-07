import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import styles from './np-header.css';

@customElement('np-header')
export class NpHeader extends LitElement {
  static styles = styles;

  render() {
    return html`<header><slot></slot></header> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-header': NpHeader;
  }
}
