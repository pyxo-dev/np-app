import '@spectrum-web-components/action-button/sp-action-button';
import '@spectrum-web-components/top-nav/sp-top-nav';
import '@spectrum-web-components/top-nav/sp-top-nav-item';
import { css, customElement, html, LitElement } from 'lit-element';
import { router } from '../../router';

@customElement('np-top-nav')
export class NpTopNav extends LitElement {
  static styles = css`
    @media screen and (min-width: 961px) {
      #side-nav-toggle {
        display: none;
      }
    }
  `;

  firstUpdated() {
    const topNav = this.renderRoot.querySelector('sp-top-nav');
    if (topNav) {
      const routeChangeHandler = () => {
        topNav.selected = window.location.href;
      };
      window.addEventListener('route-change', routeChangeHandler);
      window.addEventListener('popstate', routeChangeHandler);
      window.addEventListener('load', routeChangeHandler);
    }
  }

  updated() {
    router.updatePageLinks(this.renderRoot);
  }

  private _dispatchToggleSideNav() {
    this.dispatchEvent(
      new Event('toggle-side-nav', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <sp-top-nav>
        <sp-action-button
          id="side-nav-toggle"
          quiet
          label="Open Navigation"
          @click="${this._dispatchToggleSideNav}"
          >☰</sp-action-button
        >
        <sp-top-nav-item href="" value="Home" data-navigo>Home</sp-top-nav-item>
        <sp-top-nav-item href="blog" value="Blog" data-navigo
          >Blog</sp-top-nav-item
        >
      </sp-top-nav>
    `;
  }
}
