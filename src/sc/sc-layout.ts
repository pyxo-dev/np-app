import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { router } from '../router/router.js';
import './header/sc-header.js';
import './sc-footer.js';
import './sc-main.js';

@customElement('sc-layout')
export class ScLayout extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      overflow: hidden;

      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }

    :host > #header {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }

    :host > #main {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
    }

    :host > #footer {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
    }
  `;

  private defaultHeader = html`<sc-header id="header"></sc-header>`;

  private defaultMain = html`<sc-main id="main"></sc-main>`;

  private defaultFooter = html`<sc-footer id="footer"></sc-footer>`;

  @property({ attribute: false }) header = this.defaultHeader;

  @property({ attribute: false }) main = this.defaultMain;

  @property({ attribute: false }) footer = this.defaultFooter;

  constructor() {
    super();
    this.handleRouting();
  }

  render() {
    return html`${this.header}${this.main}${this.footer}`;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouting);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.handleRouting);
  }

  private handleRouting = async () => {
    const pathname = window.location.href.replace(window.location.origin, '');

    const detail = { id: `resolve route: ${pathname}` };
    window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
    const data = await router.resolve({ pathname });
    window.dispatchEvent(new CustomEvent('np:progressend', { detail }));

    this.header = data?.header ? html`${data.header}` : this.defaultHeader;
    this.main = data?.main ? html`${data.main}` : this.defaultMain;
    this.footer = data?.footer ? html`${data.footer}` : this.defaultFooter;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-layout': ScLayout;
  }
}
