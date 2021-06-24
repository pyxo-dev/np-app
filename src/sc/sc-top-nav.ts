import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { handleLink } from '../router/utils.js';
import './header/sc-user-settings.js';

@customElement('sc-top-nav')
export class ScTopNav extends LitElement {
  static styles = css`
    sp-top-nav > :last-child {
      margin-inline-start: auto;
    }
  `;

  render() {
    return html`
      <sp-top-nav>
        <sp-action-button quiet @click=${this.toggleAside}>
          <sp-icon-show-menu></sp-icon-show-menu>
        </sp-action-button>

        <sp-top-nav-item href="/" value="Home" @click=${handleLink}>
          Home
        </sp-top-nav-item>
        <sp-top-nav-item href="blog" value="Blog" @click=${handleLink}>
          Blog
        </sp-top-nav-item>

        <div>
          <sc-more-actions></sc-more-actions>
        </div>
      </sp-top-nav>
    `;
  }

  private toggleAside() {
    this.dispatchEvent(
      new Event('np:asidetoggle', { bubbles: true, composed: true })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-top-nav': ScTopNav;
  }
}
