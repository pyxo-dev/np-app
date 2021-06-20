import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './sc-lang-selector.js';
import './sc-theme-color-selector.js';

@customElement('sc-more-actions-items')
export class ScMoreActionsItems extends LitElement {
  static styles = css`
    :host > * + * {
      margin-inline-start: var(--spectrum-global-dimension-size-400);
    }
  `;

  render() {
    return html`
      <sc-theme-color-selector></sc-theme-color-selector>
      <sc-lang-selector></sc-lang-selector>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-more-actions-items': ScMoreActionsItems;
  }
}
