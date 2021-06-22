import '@spectrum-web-components/action-button/sp-action-button';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-up.js';
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import '../../components/main/np-side-nav';
import '../../components/main/np-top-nav';
import { router } from '../../router';
import './np-aside';
import './np-footer';
import './np-header';
import './np-main';

@customElement('np-layout')
export class NpLayout extends LitElement {
  private sideNavToggle = html`<sp-action-button
    slot="side-nav-toggle"
    id="side-nav-toggle"
    quiet
    label="Open Navigation"
    @click=${this.toggleSideNav}
    >☰</sp-action-button
  >`;

  private toggleSideNav() {
    const aside = this.renderRoot.querySelector('np-aside');
    if (aside) aside.open = !aside.open;
  }

  @state()
  private progress = html``;

  // Router outlets. The router will update their content when needed according
  // to the chosen route.
  @state()
  private header = html`
    <sp-action-button id="top-nav-toggle" quiet @click=${this._toggleTopNav}>
      <sp-icon-chevron-up></sp-icon-chevron-up>
    </sp-action-button>
    <np-top-nav></np-top-nav>
  `;

  @property({ type: Boolean, reflect: true }) topNavClosed = false;

  private _toggleTopNav() {
    this.topNavClosed = !this.topNavClosed;
  }

  static styles = css`
    :host {
      --transition-duration: 300ms;

      display: flex;
    }
    #top-nav-toggle {
      margin: auto;
      height: var(--spectrum-global-dimension-size-50);
      transform: translateY(var(--spectrum-global-dimension-size-50));
      z-index: 20;
      transition: transform var(--transition-duration);
    }
    :host([topNavClosed]) #top-nav-toggle {
      transform: rotateX(180deg);
    }
    np-top-nav {
      position: absolute;
      width: 100%;
      transition: transform var(--transition-duration);
    }
    :host([topNavClosed]) np-top-nav {
      transform: translateY(
        calc(-1 * var(--spectrum-global-dimension-size-600))
      );
    }
    #body {
      position: absolute;
      width: 100%;
      transition: transform var(--transition-duration);
    }
    :host(:not([topNavClosed])) #body {
      transform: translateY(var(--spectrum-global-dimension-size-600));
    }
  `;

  @state()
  private aside = html`<np-aside><np-side-nav></np-side-nav></np-aside>`;

  @state()
  private main = html``;

  @state()
  private footer = html``;

  constructor() {
    super();
    this.handleRouteChange();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouteChange);
    window.addEventListener('start-progress', this.startProgress);
    window.addEventListener('stop-progress', this.stopProgress);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.handleRouteChange);
    window.removeEventListener('start-progress', this.startProgress);
    window.removeEventListener('stop-progress', this.stopProgress);
    super.disconnectedCallback();
  }

  render() {
    return html`
      ${this.progress}${this.header}
      <div id="body">${this.aside}<np-main>${this.main}</np-main></div>
      ${this.footer}
    `;
  }

  private handleRouteChange = async () => {
    const pathname = window.location.href.replace(window.location.origin, '');
    this.startProgress();
    const data = await router.resolve({ pathname });
    this.stopProgress();

    if (data?.header) this.header = html`${data.header}`;
    if (data?.aside) this.aside = html`${data.aside}`;
    if (data?.main) this.main = html`${data.main}`;
    if (data?.footer) this.footer = html`${data.footer}`;
  };

  private startProgress = () => {
    this.progress = html`<sp-progress-bar indeterminate></sp-progress-bar>`;
  };

  private stopProgress = () => {
    this.progress = html``;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'np-layout': NpLayout;
  }
}
