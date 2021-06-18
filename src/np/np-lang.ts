import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { fint } from '../i18n/index.js';
import type { ScTheme } from '../sc/sc-theme';
import '../sc/sc-theme.js';

@customElement('np-lang')
export class NpLang extends LitElement {
  @property({ reflect: true }) dir = fint.dir();

  @query('sc-theme') scTheme: ScTheme | undefined;

  constructor() {
    super();
    fint.loadLangResources(fint.lang).then(() => {
      this.scTheme?.requestUpdate();
    });
    document.documentElement.lang = fint.lang;
    document.dir = fint.dir();
    this.addEventListener('np:langselection', this._handleLangSelection);
  }

  render() {
    return html`<sc-theme dir=${this.dir}></sc-theme>`;
  }

  private async _changeLang(lang: string) {
    const theme = this.scTheme;
    const detail = { id: `change lang: ${lang}` };
    theme?.handleProgressStart(new CustomEvent('np:progressstart', { detail }));
    await fint.changeLang(lang);
    theme?.handleProgressEnd(new CustomEvent('np:progressend', { detail }));

    this.dir = fint.dir();

    window.dispatchEvent(new Event('np:langchange'));

    document.documentElement.lang = this.lang;
    document.dir = this.dir;
  }

  private _handleLangSelection = async (e: CustomEvent) => {
    await this._changeLang(e.detail.lang);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'np-lang': NpLang;
  }

  interface HTMLElementEventMap {
    'np:langselection': CustomEvent;
  }
}
