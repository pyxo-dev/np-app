import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './np-more-actions-items.js';

@customElement('np-more-actions')
export class NpMoreActions extends LitElement {
  render() {
    return html`
      <overlay-trigger>
        <sp-action-button slot="trigger" quiet>
          <sp-icon-more></sp-icon-more>
        </sp-action-button>

        <sp-action-bar slot="click-content">
          <np-more-actions-items></np-more-actions-items>
        </sp-action-bar>
      </overlay-trigger>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-more-actions': NpMoreActions;
  }
}
