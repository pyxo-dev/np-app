import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './sc-page.js';

@customElement('sc-main')
export class ScMain extends LitElement {
  static styles = css``;

  render() {
    return html`<sc-page>Test main</sc-page>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-main': ScMain;
  }
}
