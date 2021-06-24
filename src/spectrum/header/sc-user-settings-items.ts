import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './sc-lang-selector.js';
import './sc-theme-color-selector.js';

@customElement('sc-user-settings-items')
export class ScUserSettingsItems extends LitElement {
  static styles = css`
    :host > * {
      margin-inline: var(--spectrum-global-dimension-size-200);
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
    'sc-user-settings-items': ScUserSettingsItems;
  }
}
