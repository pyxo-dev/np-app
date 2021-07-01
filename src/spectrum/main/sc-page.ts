import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('sc-page')
export class ScPage extends LitElement {
  static styles = css`
    :host {
      padding: 2rem 1rem 2rem;
      max-width: 120rem;
      margin-inline: auto;
    }

    @media screen and (min-width: 768px) {
      :host {
        padding-inline: 2rem;
      }
    }

    @media screen and (min-width: 1280px) {
      :host {
        padding-inline: 4rem;
      }
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
