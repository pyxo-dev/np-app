import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import type { Color } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import type { PropertyValues } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  constructor() {
    super();
    // Load theme color.
    this.loadThemeColor(this.color).then(() => {
      this.requestUpdate();
    });
  }

  // Updates the theme color when the theme color picker is used.
  private updateColor(event: Event) {
    this.color = (event.target as Picker).value as Color;
    this.loadThemeColor(this.color);
  }

  render() {
    // Theme manager. Will be placed in its corresponding slot in the theme
    // children.
    const themeManager = html`<div slot="theme-manager" id="theme-manager">
      <sp-field-label for="theme-color" side-aligned="start">
        Theme
      </sp-field-label>
      <sp-picker
        id="theme-color"
        placement="bottom"
        quiet
        value=${this.color}
        @change=${this.updateColor}
      >
        <sp-menu-item value="lightest">Lightest</sp-menu-item>
        <sp-menu-item value="light">Light</sp-menu-item>
        <sp-menu-item value="dark">Dark</sp-menu-item>
        <sp-menu-item value="darkest">Darkest</sp-menu-item>
      </sp-picker>
    </div>`;

    // When no theme color has been loaded yet (initial app load), we render a
    // div with a loading indicator while waiting for the theme color to load.
    // This is to avoid having a FOUC (flash of unstyled content).
    return this.loadedThemeColors.length === 0
      ? html`<div id="theme-loader"><div id="spinner"></div></div>`
      : html`<sp-theme color=${this.color} id="app">
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
      await new Promise(res => setTimeout(res, 1000));
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
