import type { Color } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { fint } from '../i18n/index.js';
import '../np/np-full-page-loader.js';
import './sc-layout.js';
import './sc-progress.js';

// Local storage key to use for the theme color.
const LS_THEME_COLOR_KEY = 'np:theme-color';
// Determine the fallback color using the client preference.
const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches
  ? 'darkest'
  : 'light';
// Get the theme color to use.
export const DEFAULT_COLOR = (
  window.localStorage
    ? window.localStorage.getItem(LS_THEME_COLOR_KEY) || COLOR_FALLBACK
    : COLOR_FALLBACK
) as Color;

@customElement('sc-theme')
export class ScTheme extends LitElement {
  static styles = css`
    /*
   * While the requested theme is still loading, its variables are not available,
   * we use explicit values instead.
   */
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
    }
  `;

  @property({ reflect: true }) color: Color = DEFAULT_COLOR;

  @property({ reflect: true }) dir = fint.dir();

  constructor() {
    super();
    this._loadThemeColor(this.color).then(() => this.requestUpdate());
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'np:theme:colorselection',
      this._handleColorSelection
    );
    if (!fint.ready) {
      window.addEventListener('np:i18n:fintready', this._handleFintReady, {
        once: true,
      });
    }
    window.addEventListener('np:i18n:dirchange', this._handleDirChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'np:theme:colorselection',
      this._handleColorSelection
    );
    window.removeEventListener('np:i18n:fintready', this._handleFintReady);
    window.removeEventListener('np:i18n:dirchange', this._handleDirChange);
  }

  private _handleFintReady = () => {
    this.requestUpdate();
  };

  private _handleDirChange = () => {
    this.dir = fint.dir();
  };

  render() {
    return this._loadedThemeColors.length && fint.ready
      ? html`
          <sp-theme dir=${this.dir} color=${this.color}>
            <sc-progress></sc-progress>
            <sc-layout></sc-layout>
          </sp-theme>
        `
      : html`<np-full-page-loader></np-full-page-loader>`;
  }

  private _handleColorSelection = (e: CustomEvent) => {
    this.color = e.detail.color;
    this._loadThemeColor(this.color);
    window.localStorage.setItem(LS_THEME_COLOR_KEY, this.color);
  };

  private _loadedThemeColors: Color[] = [];

  private async _loadThemeColor(color: Color) {
    if (!this._loadedThemeColors.includes(color)) {
      const detail = { id: `load theme color: ${color}` };
      window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
      // await new Promise(r => setTimeout(r, 1500));
      await import(`@spectrum-web-components/theme/theme-${color}.js`);
      window.dispatchEvent(new CustomEvent('np:progressend', { detail }));
      this._loadedThemeColors.push(color);
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
