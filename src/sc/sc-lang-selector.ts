import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { I18nController } from '../i18n/i18n-controller.js';
import { fint, tc } from '../i18n/index.js';

@customElement('sc-lang-selector')
export class ScLangSelector extends LitElement {
  private _i18nController = new I18nController(this);

  private _selectLang(e: Event) {
    const lang = (e.target as Picker).value;
    this.dispatchEvent(
      new CustomEvent('np:i18n:langselection', {
        bubbles: true,
        composed: true,
        detail: { lang },
      })
    );
  }

  render() {
    return html`
      <sp-field-label for="lang-picker" side-aligned="end">
        ${tc('language-picker-label')}
      </sp-field-label>
      <sp-picker
        id="lang-picker"
        quiet
        value=${fint.lang}
        @change=${this._selectLang}
      >
        ${fint.langs.map(
          l => html`
            <sp-menu-item value=${l}>${fint.nativeName(l)}</sp-menu-item>
          `
        )}
      </sp-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-lang-selector': ScLangSelector;
  }
}
