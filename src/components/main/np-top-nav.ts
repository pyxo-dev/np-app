import '@spectrum-web-components/action-button/sp-action-button';
import '@spectrum-web-components/switch/sp-switch';
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

    #theme-toggle {
      margin-inline-start: auto;
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

    this.updateComplete.then(() => {
      const switches = this.renderRoot.querySelectorAll('sp-switch');
      switches.forEach(sw => {
        const input = sw.renderRoot.querySelector('input');
        input?.setAttribute('style', 'opacity: 0');
      });
    });
  }

  updated() {
    router.updatePageLinks(this.renderRoot);
  }

  private _dispatchToggleSideNav() {
    this.dispatchEvent(
      new Event('toggle-side-nav', { bubbles: true, composed: true })
    );
  }

  private _dispatchToggleTheme() {
    this.dispatchEvent(
      new Event('toggle-theme', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <sp-top-nav>
        <sp-action-button
          id="side-nav-toggle"
          quiet
          label="Open Navigation"
          @click=${this._dispatchToggleSideNav}
          >☰</sp-action-button
        >
        <sp-top-nav-item href="" value="Home" data-navigo>Home</sp-top-nav-item>
        <sp-top-nav-item href="blog" value="Blog" data-navigo
          >Blog</sp-top-nav-item
        >

        <sp-switch
          id="theme-toggle"
          checked
          @change=${this._dispatchToggleTheme}
          >Dark</sp-switch
        >
      </sp-top-nav>
    `;
  }
}
