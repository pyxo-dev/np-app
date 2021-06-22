import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import './header/sc-header.js';
import './sc-footer.js';
import './sc-main.js';

@customElement('sc-layout')
export class ScLayout extends LitElement {
  static styles = css`
    :host {
      --transition-duration: 300ms;

      min-height: 100vh;
      overflow: hidden;

      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }

    :host > #header {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      height: var(--spectrum-global-dimension-size-600);
      transition: var(--transition-duration);
    }
    :host > #header.closed {
      margin-top: calc(-1 * var(--spectrum-global-dimension-size-600));
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

  render() {
    return html`${this.header}${this.main}${this.footer}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-layout': ScLayout;
  }
}
