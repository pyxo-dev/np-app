import 'carbon-web-components/es/components/button/button.js';
import AppSwitcher20 from 'carbon-web-components/es/icons/app-switcher/20.js';
import UserAvatar20 from 'carbon-web-components/es/icons/user--avatar/20.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('cc-header-global-actions')
export class CcHeaderGlobalActions extends LitElement {
  static styles = css`
    :host {
      margin-inline-start: auto;
      display: flex;
    }

    bx-btn svg {
      fill: var(--cds-icon-03);
    }
  `;

  render() {
    return html` <bx-btn kind="ghost"
        >${unsafeHTML(UserAvatar20().strings.join(''))}</bx-btn
      >
      <bx-btn kind="ghost"
        >${unsafeHTML(AppSwitcher20().strings.join(''))}</bx-btn
      >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-header-global-actions': CcHeaderGlobalActions;
  }
}
