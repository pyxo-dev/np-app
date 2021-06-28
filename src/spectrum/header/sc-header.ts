import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-home.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import type { TopNav } from '@spectrum-web-components/top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import type { PropertyValues, TemplateResult } from 'lit';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { state } from 'lit/decorators/state.js';
import { I18nController } from '../../i18n/i18n-controller.js';
import { fint } from '../../i18n/i18n.js';
import { pt, tc } from '../../i18n/utils.js';
import { BreakpointController } from '../../responsive-system/breakpoint-controller.js';
import { responsive } from '../../responsive-system/responsive-system.js';
import { BP } from '../../responsive-system/responsive.js';
import { handleLink } from '../../router/utils.js';
import './sc-user-settings.js';

@customElement('sc-header')
export class ScHeader extends LitElement {
  static styles = css`
    :host {
      z-index: 1;
    }

    sp-top-nav :last-child {
      margin-inline-start: auto;
    }
  `;

  private i18nController = new I18nController(this);

  private breakpointController = new BreakpointController(this);

  @property({ attribute: false }) tabItems = [
    { content: 'docs', pathId: 'docs' },
    { content: 'tutorial', pathId: 'tutorial' },
    { content: 'blog', pathId: 'blog' },
  ];

  @state() private preparedTabItems: Record<'content' | 'href', string>[] = [];

  willUpdate(changedProps: PropertyValues) {
    if (this.i18nController.updateRequested || changedProps.has('tabItems')) {
      this.preparedTabItems = this.tabItems.map(item => ({
        content: tc(item.content),
        href: `/${fint.lang}/${pt(item.pathId)}`,
      }));
    }
  }

  render() {
    let tabs: TemplateResult;
    if (responsive.breakpoint > BP.XS) {
      tabs = html`${this.preparedTabItems.map(
        i =>
          html`<sp-top-nav-item href="${i.href}">${i.content}</sp-top-nav-item>`
      )}`;
    } else {
      const path = window.location.href.replace(window.location.origin, '');
      tabs = html`
        <sp-picker
          id="tabs-picker"
          label=${tc('header-tabs-picker-label')}
          value=${path}
          quiet
        >
          ${this.preparedTabItems.map(
            i => html`
              <sp-menu-item @click=${handleLink} value=${i.href} href=${i.href}
                >${i.content}</sp-menu-item
              >
            `
          )}
        </sp-picker>
        <sp-top-nav-item style="margin-inline: 0;"></sp-top-nav-item>
      `;
    }

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

  @query('sp-top-nav') topNav: TopNav | undefined;

  @query('#tabs-picker') tabsPicker: Picker | undefined;

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
