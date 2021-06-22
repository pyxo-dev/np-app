import type { TopNav } from '@spectrum-web-components/top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { handleLink } from '../../router';
import './np-more-actions';

@customElement('np-top-nav')
export class NpTopNav extends LitElement {
  static styles = css`
    :host {
      z-index: 10;
    }
    sp-top-nav :last-child {
      display: flex;
      margin-inline-start: auto;
    }
  `;

  render() {
    return html`
      <sp-top-nav>
        <slot name="side-nav-toggle"></slot>

        <sp-top-nav-item href="/" value="Home" @click=${handleLink}>
          Home
        </sp-top-nav-item>
        <sp-top-nav-item href="blog" value="Blog" @click=${handleLink}>
          Blog
        </sp-top-nav-item>

        <div>
          <np-more-actions></np-more-actions>
        </div>
      </sp-top-nav>
    `;
  }

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
}

declare global {
  interface HTMLElementTagNameMap {
    'np-top-nav': NpTopNav;
  }
}
