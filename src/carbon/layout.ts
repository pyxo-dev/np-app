import 'carbon-web-components/es/components/ui-shell/header-menu-button.js';
import 'carbon-web-components/es/components/ui-shell/header-menu-item.js';
import 'carbon-web-components/es/components/ui-shell/header-menu.js';
import 'carbon-web-components/es/components/ui-shell/header-name.js';
import 'carbon-web-components/es/components/ui-shell/header-nav-item.js';
import 'carbon-web-components/es/components/ui-shell/header-nav.js';
import 'carbon-web-components/es/components/ui-shell/header.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-divider.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-items.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-link.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-menu-item.js';
import 'carbon-web-components/es/components/ui-shell/side-nav-menu.js';
import 'carbon-web-components/es/components/ui-shell/side-nav.js';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { BreakpointController } from 'src/responsive-system/breakpoint-controller.js';
import { responsive } from 'src/responsive-system/responsive-system.js';
import { BP } from 'src/responsive-system/responsive.js';
import { router } from 'src/router/router.js';

@customElement('cc-layout')
export class CcLayout extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      overflow: hidden;

      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr auto;
    }

    :host > #header {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }

    :host > #side-nav {
      grid-column: 1 / 2;
      grid-row: 2 / -1;
    }

    :host > #main {
      grid-column: 2 / -1;
      grid-row: 2 / 3;
    }

    :host > #footer {
      grid-column: 2 / -1;
      grid-row: 3 / -1;
    }

    bx-header,
    bx-side-nav {
      position: unset;
    }
  `;

  private breakpointController = new BreakpointController(this);

  private defaultHeader = html`<bx-header
    id="header"
    aria-label="IBM Platform Name"
  >
    <bx-header-menu-button
      button-label-active="Close menu"
      button-label-inactive="Open menu"
    ></bx-header-menu-button>
    <bx-header-name href="javascript:void 0" prefix="IBM"
      >[Platform]</bx-header-name
    >
    <bx-header-nav menu-bar-label="IBM [Platform]">
      <bx-header-nav-item href="javascript:void 0">Link 1</bx-header-nav-item>
      <bx-header-nav-item href="javascript:void 0">Link 2</bx-header-nav-item>
      <bx-header-nav-item href="javascript:void 0">Link 3</bx-header-nav-item>
      <bx-header-menu menu-label="Link 4" trigger-content="Link 4">
        <bx-header-menu-item href="javascript:void 0"
          >Sub-link 1</bx-header-menu-item
        >
        <bx-header-menu-item href="javascript:void 0"
          >Sub-link 2</bx-header-menu-item
        >
        <bx-header-menu-item href="javascript:void 0"
          >Sub-link 3</bx-header-menu-item
        >
      </bx-header-menu>
    </bx-header-nav>
  </bx-header>`;

  private defaultSideNav = () => html`<bx-side-nav
    id="side-nav"
    aria-label="Side navigation"
    expanded
    collapse-mode="responsive"
  >
    <bx-side-nav-items>
      ${responsive.breakpoint < BP.M
        ? html`
            <bx-side-nav-link href="javascript:void(0)"
              >Link 1</bx-side-nav-link
            >
            <bx-side-nav-link href="javascript:void(0)"
              >Link 2</bx-side-nav-link
            >
            <bx-side-nav-link href="javascript:void(0)"
              >Link 3</bx-side-nav-link
            >

            <bx-side-nav-menu title="Link 4">
              <bx-side-nav-menu-item href="javascript:void 0">
                Sub-link 1
              </bx-side-nav-menu-item>
              <bx-side-nav-menu-item href="javascript:void 0">
                Sub-link 2
              </bx-side-nav-menu-item>
              <bx-side-nav-menu-item href="javascript:void 0">
                Sub-link 3
              </bx-side-nav-menu-item>
            </bx-side-nav-menu>

            <bx-side-nav-divider></bx-side-nav-divider>
          `
        : ''}

      <bx-side-nav-menu title="L0 menu">
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
      </bx-side-nav-menu>
      <bx-side-nav-menu title="L0 menu">
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
        <bx-side-nav-menu-item
          active
          aria-current="page"
          href="javascript:void 0"
        >
          L0 menu item
        </bx-side-nav-menu-item>
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
      </bx-side-nav-menu>
      <bx-side-nav-menu title="L0 menu">
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
        <bx-side-nav-menu-item href="javascript:void 0">
          L0 menu item
        </bx-side-nav-menu-item>
      </bx-side-nav-menu>
      <bx-side-nav-divider></bx-side-nav-divider>
      <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
      <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
    </bx-side-nav-items>
  </bx-side-nav>`;

  private defaultMain = html`<main id="main">Main...</main>`;

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
    if (header === undefined) header = this.defaultHeader;

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
