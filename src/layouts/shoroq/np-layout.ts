import '@spectrum-web-components/action-button/sp-action-button';
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

  // Router outlets. The router will update their content when needed according
  // to the chosen route.
  @state()
  private headerOutlet = html`
    <np-header
      ><np-top-nav
        >${this.sideNavToggle}<slot
          name="theme-manager"
          slot="theme-manager"
        ></slot></np-top-nav
    ></np-header>
  `;

  @state()
  private asideOutlet = html`
    <np-aside><np-side-nav></np-side-nav></np-aside>
  `;

  @state()
  private mainOutlet = html`<np-main></np-main>`;

  @state()
  private footerOutlet = html``;

  constructor() {
    super();
    // Setup the routing.
    router.on('/', () => {
      this.mainOutlet = html`<np-main>Home ...</np-main>`;
    });
    router.on('/blog', () => {
      this.mainOutlet = html`<np-main>Blog ...</np-main>`;
    });
    router.on('/docs', () => {
      this.mainOutlet = html`<np-main>Docs ...</np-main>`;
    });
    router.on('/guides', () => {
      this.mainOutlet = html`<np-main>Guides ...</np-main>`;
    });
    router.on('/community', () => {
      this.mainOutlet = html`<np-main>Community ...</np-main>`;
    });
    router.on('/about', () => {
      this.mainOutlet = html`<np-main>About ...</np-main>`;
    });

    router.resolve();
  }

  render() {
    return html`
      ${this.headerOutlet}
      <div id="body">${this.asideOutlet}${this.mainOutlet}</div>
      ${this.footerOutlet}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-layout': NpLayout;
  }
}
