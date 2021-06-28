import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('sc-page')
export class ScPage extends LitElement {
  static styles = css`
    :host {
      padding: 4rem 5rem 2rem;
      max-width: 70ch;
      margin-inline: auto;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-page': ScPage;
  }
}
