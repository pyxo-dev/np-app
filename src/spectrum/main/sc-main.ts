import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('sc-main')
export class ScMain extends LitElement {
  static styles = css``;

  render() {
    return html`<div>Test main</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-main': ScMain;
  }
}
