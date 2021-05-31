import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-dark.js';
import { css, customElement, html, LitElement, property } from 'lit-element';
import { router } from '../../router';
import './np-aside';
import './np-header';
import './np-main';

@customElement('np-layout')
export class NpLayout extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100vh;
    }

    sp-theme {
      --swc-header-height: var(--spectrum-global-dimension-size-600);
    }

    #app {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    np-header {
      min-height: var(--swc-header-height);
      border-bottom: 1px solid var(--spectrum-global-color-gray-200);
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: var(--spectrum-global-color-gray-50);
      top: 0px;
      right: 0px;
      left: 0px;
      padding-left: 8px;
      z-index: 10;
    }

    #body {
      position: relative;
      display: flex;
      flex-direction: row;
      flex: 1 1 auto;
      height: calc(100% - var(--spectrum-global-dimension-size-600) - 1px);
      color: var(--spectrum-global-color-gray-800);
    }

    np-aside {
      display: flex;
      flex: 0 0 auto;
      box-sizing: border-box;
    }

    np-main {
      background-color: var(--spectrum-global-color-gray-50);
      position: relative;
      max-height: calc(100vh - var(--swc-header-height) - 1px);
      width: 100%;
      overflow: auto;
    }
  `;

  @property() headerOutlet = html``;
  @property() asideOutlet = html``;
  @property() mainOutlet = html``;

  constructor() {
    super();

    const loadNavs = () => {
      import('../../components/main/np-top-nav');
      import('../../components/main/np-side-nav');
      this.headerOutlet = html`<np-top-nav></np-top-nav>`;
      this.asideOutlet = html`<np-side-nav></np-side-nav>`;
    };

    router.on('/', () => {
      loadNavs();
      this.mainOutlet = html`Home ...`;
    });

    router.on('/blog', () => {
      loadNavs();
      this.mainOutlet = html`Blog ...`;
    });

    router.on('/docs', () => {
      loadNavs();
      this.mainOutlet = html`Docs ...`;
    });

    router.on('/guides', () => {
      loadNavs();
      this.mainOutlet = html`Guides ...`;
    });

    router.on('/community', () => {
      loadNavs();
      this.mainOutlet = html`Community ...`;
    });

    router.on('/about', () => {
      loadNavs();
      this.mainOutlet = html`About ...`;
    });

    router.resolve();
  }

  @property({ type: Boolean, reflect: true })
  public dark = true;

  firstUpdated() {
    window.addEventListener('toggle-theme', () => {
      this.dark = !this.dark;
      import(
        `@spectrum-web-components/theme/theme-${
          this.dark ? 'dark' : 'light'
        }.js`
      );
    });
  }

  render() {
    return html`
      <sp-theme color=${this.dark ? 'dark' : 'light'} id="app">
        <np-header>${this.headerOutlet}</np-header>

        <div id="body">
          <np-aside>${this.asideOutlet}</np-aside>

          <np-main>${this.mainOutlet}</np-main>
        </div>
      </sp-theme>
    `;
  }
}
