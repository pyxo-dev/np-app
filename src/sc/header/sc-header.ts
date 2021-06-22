import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-home.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import { TopNav } from '@spectrum-web-components/top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { I18nController } from '../../i18n/i18n-controller.js';
import { tc } from '../../i18n/index.js';
import { BreakpointController } from '../../responsive/breakpoint-controller.js';
import { responsive } from '../../responsive/index.js';
import { Bp } from '../../responsive/responsive.js';
import { handleLink } from '../../router.js';
import './sc-user-settings.js';

@customElement('sc-header')
export class ScHeader extends LitElement {
  static styles = css`
    sp-top-nav :last-child {
      margin-inline-start: auto;
    }
  `;

  private i18nController = new I18nController(this);

  private breakpointController = new BreakpointController(this);

  @property({ attribute: false }) tabItems = [
    { content: 'docs', href: 'docs' },
    { content: 'tutorial', href: 'tutorial' },
    { content: 'blog', href: 'blog' },
  ];

  render() {
    const tabsFullView = html`${this.tabItems.map(item => {
      const href = item.href.startsWith('/') ? item.href : `/${item.href}`;
      return html`
        <sp-top-nav-item href=${href}>${tc(item.content)}</sp-top-nav-item>
      `;
    })}`;

    const path = window.location.href.replace(window.location.origin, '');
    const tabsPickerView = html`
      <sp-picker
        id="tabs-picker"
        label=${tc('header-tabs-picker-label')}
        value=${path}
        quiet
      >
        ${this.tabItems.map(item => {
          const href = item.href.startsWith('/') ? item.href : `/${item.href}`;
          return html`
            <sp-menu-item @click=${handleLink} value=${href} href=${href}
              >${tc(item.content)}</sp-menu-item
            >
          `;
        })}
      </sp-picker>
      <sp-top-nav-item style="margin-inline: 0;"></sp-top-nav-item>
    `;

    const tabs = responsive.breakpoint > Bp.XS ? tabsFullView : tabsPickerView;

    return html`
      <sp-top-nav @click=${handleLink}>
        <sp-action-button href="/" quiet>
          <sp-icon-home></sp-icon-home>
        </sp-action-button>

        ${tabs}

        <div>
          <sc-user-settings></sc-user-settings>
        </div>
      </sp-top-nav>
    `;
  }

  @query('sp-top-nav') topNav: TopNav | undefined;

  @query('#tabs-picker') tabsPicker: Picker | undefined;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouteChange);
    window.addEventListener('np:i18n:langchange', this.handleLangChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.handleRouteChange);
    window.removeEventListener('np:i18n:langchange', this.handleLangChange);
  }

  private handleRouteChange = () => {
    if (this.topNav) this.topNav.selected = window.location.href;
    if (this.tabsPicker) {
      this.tabsPicker.value = window.location.href.replace(
        window.location.origin,
        ''
      );
    }
  };

  private handleLangChange = () => {
    if (this.topNav) {
      this.topNav.selected = '';
      this.topNav.selected = window.location.href;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-header': ScHeader;
  }
}
