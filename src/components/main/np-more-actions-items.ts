import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './np-locale-selector';
import './np-theme-color-picker';

@customElement('np-more-actions-items')
export class NpMoreActionsItems extends LitElement {
  static styles = css`
    :host > * + * {
      margin-inline-start: var(--spectrum-global-dimension-size-400);
    }
  `;

  render() {
    return html`
      <np-theme-color-picker></np-theme-color-picker>
      <np-locale-picker></np-locale-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-more-actions-items': NpMoreActionsItems;
  }
}
