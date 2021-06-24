import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('sc-footer')
export class ScFooter extends LitElement {
  static styles = css``;

  render() {
    return html`<div>Test footer</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-footer': ScFooter;
  }
}
