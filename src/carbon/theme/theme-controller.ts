import type { CarbonTheme } from 'carbon/theme/utils.js';
import { LS_THEME_KEY } from 'carbon/theme/utils.js';
import type { ReactiveControllerHost, TemplateResult } from 'lit';
import { html, ReactiveController } from 'lit';

export class ThemeController implements ReactiveController {
  host: ReactiveControllerHost & { theme: CarbonTheme };

  updateRequested = false;

  loadedThemes: Partial<Record<CarbonTheme, string>> = {};

  styleElement?: TemplateResult;

  constructor(host: ReactiveControllerHost & { theme: CarbonTheme }) {
    this.host = host;
    host.addController(this);
    this.loadTheme(this.host.theme).then(this.requestHostUpdate);
  }

  hostConnected() {
    window.addEventListener('np:theme-selection', this.handleThemeSelection);
  }

  hostDisconnected() {
    window.removeEventListener('np:theme-selection', this.handleThemeSelection);
  }

  hostUpdate() {
    const css = this.loadedThemes[this.host.theme];
    if (css) {
      this.styleElement = html`<style>
        ${css}
      </style>`;
    }
  }

  private handleThemeSelection = async (
    e: CustomEvent<Record<'theme', CarbonTheme>>
  ) => {
    const { theme } = e.detail;
    window.localStorage.setItem(LS_THEME_KEY, theme);
    this.host.theme = await this.loadTheme(theme);
  };

  private async loadTheme(theme: CarbonTheme) {
    if (!Object.keys(this.loadedThemes).includes(theme)) {
      const detail = { id: `load theme: ${theme}` };
      window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
      // await new Promise(r => setTimeout(r, 1500));
      this.loadedThemes[theme] = (
        await import(`../../../../src/carbon/theme/${theme}.css`)
      ).default;
      window.dispatchEvent(new CustomEvent('np:progressend', { detail }));
    }
    return theme;
  }

  private requestHostUpdate = () => {
    this.updateRequested = true;
    this.host.requestUpdate();
    this.host.updateComplete.then(() => {
      this.updateRequested = false;
    });
  };
}

declare global {
  interface WindowEventMap {
    'np:theme-selection': CustomEvent;
  }
}
