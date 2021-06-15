import { ActionBar } from '@spectrum-web-components/action-bar';
import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import './np-more-actions-items.js';

@customElement('np-more-actions')
export class NpMoreActions extends LitElement {
  static styles = css`
    sp-action-bar {
      position: absolute;
      top: 100%;
    }
    sp-action-bar[dir='ltr'] {
      right: 0;
    }
    sp-action-bar[dir='rtl'] {
      left: 0;
    }
  `;

  @query('sp-action-bar')
  actionBar: ActionBar | undefined;

  private _toggleBar() {
    if (this.actionBar) this.actionBar.open = !this.actionBar.open;
  }

  render() {
    return html`
      <div>
        <sp-action-button quiet @click=${this._toggleBar}>
          ...
        </sp-action-button>

        <sp-action-bar>
          <np-more-actions-items></np-more-actions-items>
        </sp-action-bar>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-more-actions': NpMoreActions;
  }
}
