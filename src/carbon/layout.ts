import 'carbon-web-components/es/components/button/button.js';
import 'carbon-web-components/es/components/skip-to-content/skip-to-content.js';
import 'carbon-web-components/es/components/ui-shell/header-menu-button.js';
import 'carbon-web-components/es/components/ui-shell/header-name.js';
import 'carbon-web-components/es/components/ui-shell/header-nav-item.js';
import 'carbon-web-components/es/components/ui-shell/header-nav.js';
import 'carbon-web-components/es/components/ui-shell/header.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-items.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-link.js';
import 'carbon-web-components/es/components/ui-shell/side-nav.js';
import AppSwitcher20 from 'carbon-web-components/es/icons/app-switcher/20.js';
import UserAvatar20 from 'carbon-web-components/es/icons/user--avatar/20.js';
import type { TemplateResult } from 'lit';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { I18nController } from 'src/i18n/i18n-controller.js';
import { p, tc } from 'src/i18n/utils.js';
import { BreakpointController } from 'src/responsive-system/breakpoint-controller.js';
import { responsive } from 'src/responsive-system/responsive-system.js';
import { BP } from 'src/responsive-system/responsive.js';
import { router } from 'src/router/router.js';
import { handleLink } from 'src/router/utils.js';

@customElement('cc-layout')
export class CcLayout extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      overflow: hidden;

      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr auto;

      background-color: var(--cds-ui-background, #fff);
      color: var(--cds-text-01, #161616);
    }

    #header {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }

    #side-nav {
      grid-column: 1 / 2;
      grid-row: 2 / -1;
    }

    #main {
      grid-column: 2 / -1;
      grid-row: 2 / 3;
    }

    #footer {
      grid-column: 2 / -1;
      grid-row: 3 / -1;
    }

    bx-header,
    bx-side-nav {
      position: unset;
    }

    #header-global {
      margin-inline-start: auto;
      display: flex;
    }

    #header-global bx-btn svg {
      fill: var(--cds-icon-03);
    }
  `;

  private i18nController = new I18nController(this);

  private breakpointController = new BreakpointController(this);

  @query('#main') mainElement: HTMLElement | undefined;

  private skipToContent = () => {
    this.mainElement?.focus();
  };

  private defaultHeader = () => {
    const brandName = tc('brand-name');

    return html`<bx-header
      id="header"
      aria-label=${brandName}
      @click=${handleLink}
    >
      <bx-skip-to-content href="javascript: void 0" @click=${this.skipToContent}
        >${tc('skip-to-content')}</bx-skip-to-content
      >
      <bx-header-menu-button
        button-label-active=${tc('header-menu-button-label-active')}
        button-label-inactive=${tc('header-menu-button-label-inactive')}
      ></bx-header-menu-button>
      <bx-header-name href="/">${brandName}</bx-header-name>

      <bx-header-nav menu-bar-label=${brandName}>
        <bx-header-nav-item href=${p('docs')}>${tc('docs')}</bx-header-nav-item>
        <bx-header-nav-item href=${p('tutorial')}
          >${tc('tutorial')}</bx-header-nav-item
        >
        <bx-header-nav-item href=${p('blog')}>${tc('blog')}</bx-header-nav-item>
      </bx-header-nav>
      <div id="header-global">
        <bx-btn kind="ghost"
          >${unsafeHTML(UserAvatar20().strings.join(''))}</bx-btn
        >
        <bx-btn kind="ghost"
          >${unsafeHTML(AppSwitcher20().strings.join(''))}</bx-btn
        >
      </div>
    </bx-header>`;
  };

  private defaultSideNav = () =>
    responsive.breakpoint < BP.M
      ? html`<bx-side-nav
          id="side-nav"
          aria-label="Side navigation"
          expanded
          collapse-mode="responsive"
          @click=${handleLink}
        >
          <bx-side-nav-items>
            <bx-side-nav-link href=${p('docs')}>${tc('docs')}</bx-side-nav-link>
            <bx-side-nav-link href=${p('tutorial')}
              >${tc('tutorial')}</bx-side-nav-link
            >
            <bx-side-nav-link href=${p('blog')}>${tc('blog')}</bx-side-nav-link>
          </bx-side-nav-items>
        </bx-side-nav>`
      : html``;

  private defaultMain = html`<main id="main" tabindex="0">Main...</main>`;

  private defaultFooter = html`<footer id="footer">Footer...</footer>`;

  @property({ attribute: false })
  header?: TemplateResult | (() => TemplateResult);

  @property({ attribute: false })
  sideNav?: TemplateResult | (() => TemplateResult);

  @property({ attribute: false })
  main?: TemplateResult | (() => TemplateResult);

  @property({ attribute: false })
  footer?: TemplateResult | (() => TemplateResult);

  render() {
    let header =
      typeof this.header === 'function' ? this.header() : this.header;
    if (header === undefined) header = this.defaultHeader();

    let sideNav =
      typeof this.sideNav === 'function' ? this.sideNav() : this.sideNav;
    if (sideNav === undefined) sideNav = this.defaultSideNav();

    let main = typeof this.main === 'function' ? this.main() : this.main;
    if (main === undefined) main = this.defaultMain;

    let footer =
      typeof this.footer === 'function' ? this.footer() : this.footer;
    if (footer === undefined) footer = this.defaultFooter;

    return html`${header}${sideNav}${main}${footer}`;
  }

  private handleRouteChange = async () => {
    const pathname = window.location.href.replace(window.location.origin, '');

    const detail = { id: `resolve route: ${pathname}` };
    window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
    const data = await router.resolve({ pathname });
    window.dispatchEvent(new CustomEvent('np:progressend', { detail }));

    this.header = data?.header;
    this.sideNav = data?.sideNav;
    this.main = data?.main;
    this.footer = data?.footer;
  };

  constructor() {
    super();
    this.handleRouteChange();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouteChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.handleRouteChange);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-layout': CcLayout;
  }
}
