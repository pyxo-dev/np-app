import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './np-main.css';

@customElement('np-main')
export class NpMain extends LitElement {
  static styles = styles;

  render() {
    return html`<main role="main">
      <div id="page"><slot></slot></div>
    </main>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-main': NpMain;
  }
}
