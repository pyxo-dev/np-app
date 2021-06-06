import '@spectrum-web-components/action-button/sp-action-button';
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../components/main/np-side-nav';
import '../../components/main/np-top-nav';
import { router } from '../../router';
import './np-aside';
import './np-footer';
import './np-header';
import styles from './np-layout.css';
import './np-main';

@customElement('np-layout')
export class NpLayout extends LitElement {
  // css styles.
  static styles = styles;

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
    <np-header
      ><np-top-nav
        >${this.sideNavToggle}<slot
          name="theme-manager"
          slot="theme-manager"
        ></slot></np-top-nav
    ></np-header>
  `;

  @state()
  private aside = html` <np-aside><np-side-nav></np-side-nav></np-aside> `;

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
