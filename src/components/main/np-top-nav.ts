import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import type { TopNav } from '@spectrum-web-components/top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { fint } from '../../i18n/index.js';
import { handleSpaLink } from '../../router';

@customElement('np-top-nav')
export class NpTopNav extends LitElement {
  @query('sp-top-nav')
  spTopNav: TopNav | undefined;

  constructor() {
    super();
    this.updateComplete.then(() => {
      this.handleRouteChange();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouteChange);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.handleRouteChange);
    super.disconnectedCallback();
  }

  private handleRouteChange = () => {
    if (this.spTopNav) this.spTopNav.selected = window.location.href;
  };

  private setLocale(event: Event) {
    fint.setLocale((event.target as Picker).value);
  }

  render() {
    const localeSelector = html`<div
      id="locale-selector"
      style="margin-inline-end: 5px;"
    >
      <sp-picker
        placement="bottom"
        quiet
        size="s"
        value=${fint.locale}
        @change=${this.setLocale}
      >
        ${fint.locales.map(
          l => html`<sp-menu-item value=${l}>
            ${fint.conf.localesConf?.[l]?.nativeName || l}
          </sp-menu-item>`
        )}
      </sp-picker>
    </div>`;

    return html`<sp-top-nav>
      <slot name="side-nav-toggle"></slot>

      <sp-top-nav-item href="/" value="Home" @click=${handleSpaLink}
        >Home</sp-top-nav-item
      >
      <sp-top-nav-item href="blog" value="Blog" @click=${handleSpaLink}
        >Blog</sp-top-nav-item
      >

      <slot name="theme-manager"></slot>
      ${localeSelector}
    </sp-top-nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-top-nav': NpTopNav;
  }
}
