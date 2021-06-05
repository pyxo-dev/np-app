import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './np-footer.css';

@customElement('np-footer')
export class NpFooter extends LitElement {
  static styles = styles;

  render() {
    return html`<footer id="footer"><slot></slot></footer>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-footer': NpFooter;
  }
}
