import type { Color } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/scale-large.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { fint } from '../../i18n/i18n.js';
import '../../np/np-full-page-loader.js';
import '../sc-layout.js';
import '../sc-progress.js';
import { DEFAULT_COLOR, LS_THEME_COLOR_KEY } from './utils.js';

@customElement('sc-theme')
export class ScTheme extends LitElement {
  static styles = css`
    np-full-page-loader {
      background-color: #fff;
    }
    :host([color='dark']) np-full-page-loader {
      background-color: #252525;
    }
    :host([color='darkest']) np-full-page-loader {
      background-color: #000;
    }

    sp-theme {
      background-color: var(--spectrum-global-color-gray-100);
      color: var(--spectrum-global-color-gray-800);
      --spectrum-global-font-family-base: var(--np-font-family-base);
    }
  `;

  @property({ reflect: true }) color: Color = DEFAULT_COLOR;

  @property({ reflect: true }) dir = fint.dir();

  constructor() {
    super();
    this.loadThemeColor(this.color).then(() => this.requestUpdate());
    fint.initComplete.then(() => this.requestUpdate());
  }

  render() {
    return this.loadedThemeColors.length && fint.ready
      ? html`
          <sp-theme dir=${this.dir} color=${this.color} scale="large">
            <sc-progress></sc-progress>
            <sc-layout></sc-layout>
          </sp-theme>
        `
      : html`<np-full-page-loader></np-full-page-loader>`;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'np:theme:colorselection',
      this.handleColorSelection
    );
    window.addEventListener('np:i18n:dirchange', this.handleDirChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'np:theme:colorselection',
      this.handleColorSelection
    );
    window.removeEventListener('np:i18n:dirchange', this.handleDirChange);
  }

  private handleColorSelection = (e: CustomEvent) => {
    this.color = e.detail.color;
    this.loadThemeColor(this.color);
    window.localStorage.setItem(LS_THEME_COLOR_KEY, this.color);
  };

  private handleDirChange = () => {
    this.dir = fint.dir();
  };

  private loadedThemeColors: Color[] = [];

  private async loadThemeColor(color: Color) {
    if (!this.loadedThemeColors.includes(color)) {
      const detail = { id: `load theme color: ${color}` };
      window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
      // await new Promise(r => setTimeout(r, 1500));
      if (color === 'lightest') {
        await import('@spectrum-web-components/theme/theme-lightest.js');
      } else if (color === 'light') {
        await import('@spectrum-web-components/theme/theme-light.js');
      } else if (color === 'dark') {
        await import('@spectrum-web-components/theme/theme-dark.js');
      } else {
        await import('@spectrum-web-components/theme/theme-darkest.js');
      }
      window.dispatchEvent(new CustomEvent('np:progressend', { detail }));
      this.loadedThemeColors.push(color);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-theme': ScTheme;
  }

  interface WindowEventMap {
    'np:theme:colorselection': CustomEvent;
  }
}
