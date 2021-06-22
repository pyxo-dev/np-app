import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('sc-side-nav')
export class ScSideNav extends LitElement {
  static styles = css``;

  render() {
    return html`<div>Test side nav</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-side-nav': ScSideNav;
  }
}
