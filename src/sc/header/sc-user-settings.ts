import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-user-admin.js';
import '@spectrum-web-components/underlay/sp-underlay.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import './sc-user-settings-items.js';

@customElement('sc-user-settings')
export class ScUserSettings extends LitElement {
  static styles = css`
    sp-action-bar {
      position: absolute;
      top: 50%;
      inset-inline-end: 0;
  `;

  @property({ type: Boolean }) open = false;

  private show() {
    this.open = true;
  }

  private hide() {
    this.open = false;
  }

  render() {
    return html`
      <sp-underlay ?open=${this.open} @click=${this.hide}></sp-underlay>
      <sp-action-button @click=${this.show} quiet>
        <sp-icon-user-admin></sp-icon-user-admin>
      </sp-action-button>

      <sp-action-bar ?open=${this.open}>
        <sc-user-settings-items></sc-user-settings-items>
      </sp-action-bar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-user-settings': ScUserSettings;
  }
}
