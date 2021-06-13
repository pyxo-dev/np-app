import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import type { Color } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import type { PropertyValues } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { fint, t } from './i18n/index.js';
import './layouts/shoroq/np-layout';
import styles from './np-theme.css';

// Key to use for saving the selected theme in the client local storage.
const SWC_THEME_COLOR_KEY = 'nashirp:theme:color';
// Determine fallback color using the client preference.
const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';
// Calculate the theme color to use.
const DEFAULT_COLOR = (
  window.localStorage
    ? localStorage.getItem(SWC_THEME_COLOR_KEY) || COLOR_FALLBACK
    : COLOR_FALLBACK
) as Color;

@customElement('np-theme')
export class NpTheme extends LitElement {
  // css styles.
  static styles = styles;

  // Theme color.
  @property({ reflect: true })
  color: Color = DEFAULT_COLOR;

  @property({ reflect: true })
  public dir: 'ltr' | 'rtl' = fint.conf.localesConf?.[fint.locale].rtl
    ? 'rtl'
    : 'ltr';

  constructor() {
    super();
    // Load theme color.
    this.loadThemeColor(this.color).then(this._requestUpdate);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('locale-set', this.handleLocaleSet);
  }

  disconnectedCallback() {
    window.removeEventListener('locale-set', this.handleLocaleSet);
    super.disconnectedCallback();
  }

  @query('#theme-color')
  themeColorPicker: Picker | undefined;

  private _requestUpdate = () => {
    this.requestUpdate();
  };

  private handleLocaleSet = () => {
    const dir = fint.conf.localesConf?.[fint.locale].rtl ? 'rtl' : 'ltr';
    console.log(dir);
    this.dir = dir;
    document.dir = dir;
    document.documentElement.lang = fint.locale;
    this.requestUpdate();
    this.updateComplete.then(() => {
      if (this.themeColorPicker) {
        this.themeColorPicker.value = '';
        this.themeColorPicker.value = this.color;
      }
    });
  };

  // Updates the theme color when the theme color picker is used.
  private updateColor() {
    this.color = this.themeColorPicker?.value as Color;
    this.loadThemeColor(this.color);
  }

  render() {
    // When no theme color has been loaded yet (initial app load), we render a
    // div with a loading indicator while waiting for the theme color to load.
    // This is to avoid having a FOUC (flash of unstyled content).
    // We also wait for the translation resources to be loaded.
    if (
      this.loadedThemeColors.length === 0 ||
      !fint.loadedResources.global ||
      !fint.loadedResources.global.includes(fint.locale)
    ) {
      return html`<div id="theme-loader"><div id="spinner"></div></div>`;
    }

    // Theme manager. Will be placed in its corresponding slot in the theme
    // children.
    const themeManager = html`<div slot="theme-manager" id="theme-manager">
      <sp-picker
        id="theme-color"
        placement="bottom"
        quiet
        size="s"
        value=${this.color}
        @change=${this.updateColor}
      >
        <sp-menu-item value="lightest">${t('lightest')}</sp-menu-item>
        <sp-menu-item value="light">${t('light')}</sp-menu-item>
        <sp-menu-item value="dark">${t('dark')}</sp-menu-item>
        <sp-menu-item value="darkest">${t('darkest')}</sp-menu-item>
      </sp-picker>
    </div>`;

    return html`<sp-theme dir=${this.dir} color=${this.color} id="app">
      <slot><np-layout>${themeManager}</np-layout></slot>
    </sp-theme>`;
  }

  updated(changes: PropertyValues) {
    if (changes.has('color')) {
      // Keep the local storage key synchronized with the theme color.
      window.localStorage?.setItem(SWC_THEME_COLOR_KEY, this.color);
    }
  }

  // Array to keep track of loaded theme colors.
  private loadedThemeColors: Color[] = [];

  // Theme color loader.
  private async loadThemeColor(color: Color) {
    if (!this.loadedThemeColors.includes(color)) {
      window.dispatchEvent(new Event('start-progress'));
      switch (color) {
        case 'dark':
          await import('@spectrum-web-components/theme/theme-dark.js');
          break;
        case 'darkest':
          await import('@spectrum-web-components/theme/theme-darkest.js');
          break;
        case 'light':
          await import('@spectrum-web-components/theme/theme-light.js');
          break;
        case 'lightest':
          await import('@spectrum-web-components/theme/theme-lightest.js');
          break;
        default:
      }
      window.dispatchEvent(new Event('stop-progress'));
      this.loadedThemeColors.push(color);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-theme': NpTheme;
  }
}
