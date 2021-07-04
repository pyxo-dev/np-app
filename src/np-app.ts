import 'carbon/layout.js';
import { ThemeController } from 'carbon/theme/theme-controller.js';
import { defaultTheme } from 'carbon/theme/utils.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import 'src/np/np-full-page-loader.js';
import { fint } from './i18n/i18n.js';

@customElement('np-app')
export class NpApp extends LitElement {
  @property({ reflect: true }) theme = defaultTheme;

  private themeController = new ThemeController(this);

  render() {
    return fint.ready && this.themeController.styleElement
      ? html`${this.themeController.styleElement}<cc-layout></cc-layout>`
      : html`<np-full-page-loader></np-full-page-loader>`;
  }

  constructor() {
    super();
    fint.initComplete.then(() => this.requestUpdate());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-app': NpApp;
  }
}
