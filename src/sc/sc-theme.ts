import type { Color } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { fint } from '../i18n/index.js';
import '../np/np-full-page-loader.js';
import './sc-layout.js';
import './sc-progress-bar.js';

// Local storage key to use for the theme color.
const LS_THEME_COLOR_KEY = 'np:sc-theme-color';
// Determine the fallback color using the client preference.
const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
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
      min-height: 100%;
      background-color: var(--spectrum-global-color-gray-100);
    }
  `;

  @property({ reflect: true }) color: Color = DEFAULT_COLOR;

  @property({ reflect: true }) dir = fint.dir();

  // Tracks async operations which are in progress.
  private _opsInProgress = new Set<string>();

  @state() private _opsInProgressCount = 0;

  constructor() {
    super();
    this._loadThemeColor(this.color).then(() => this.requestUpdate());
    this.addEventListener('np:themecolorselection', this._handleColorSelection);
    this.addEventListener('np:progressstart', this.handleProgressStart);
    this.addEventListener('np:progressend', this.handleProgressEnd);
  }

  render() {
    if (
      this._loadedThemeColors.length === 0 ||
      // No global translation messages loaded yet.
      !fint.loadedResources.global ||
      // Global translation messages for the current locale not loaded yet.
      !fint.loadedResources.global.includes(fint.lang)
    ) {
      return html`<np-full-page-loader></np-full-page-loader>`;
    }

    const progress = this._opsInProgressCount
      ? html`<sc-progress-bar></sc-progress-bar>`
      : '';

    return html`
      <sp-theme dir=${this.dir} color=${this.color}>
        ${progress}
        <sc-layout></sc-layout>
      </sp-theme>
    `;
  }

  private _handleColorSelection = (e: CustomEvent) => {
    this.color = e.detail.color;
    this._loadThemeColor(this.color);
    window.localStorage?.setItem(LS_THEME_COLOR_KEY, this.color);
  };

  handleProgressStart = (e: CustomEvent) => {
    this._opsInProgress.add(e.detail.id);
    this._opsInProgressCount = this._opsInProgress.size;
  };

  handleProgressEnd = (e: CustomEvent) => {
    this._opsInProgress.delete(e.detail.id);
    this._opsInProgressCount = this._opsInProgress.size;
  };

  private _loadedThemeColors: Color[] = [];

  private async _loadThemeColor(color: Color) {
    if (!this._loadedThemeColors.includes(color)) {
      const detail = { id: `load theme color: ${color}` };
      this.handleProgressStart(new CustomEvent('np:progressstart', { detail }));
      await import(`@spectrum-web-components/theme/theme-${color}.js`);
      this.handleProgressEnd(new CustomEvent('np:progressend', { detail }));
      this._loadedThemeColors.push(color);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-theme': ScTheme;
  }

  interface HTMLElementEventMap {
    'np:themecolorselection': CustomEvent;
    'np:progressstart': CustomEvent;
    'np:progressend': CustomEvent;
  }
}
