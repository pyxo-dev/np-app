import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { fint, tc } from '../../i18n/index.js';

@customElement('np-locale-picker')
export class NpLocalePicker extends LitElement {
  private static _updateLocale(e: Event) {
    fint.setLocale((e.target as Picker).value);
  }

  render() {
    return html`
      <sp-field-label for="locale-picker" side-aligned="end">
        ${tc('locale-picker-label')}
      </sp-field-label>
      <sp-picker
        id="locale-picker"
        quiet
        value=${fint.locale}
        @change=${NpLocalePicker._updateLocale}
      >
        ${fint.locales.map(
          l => html`<sp-menu-item value=${l}>
            ${fint.conf.localesConf?.[l]?.nativeName || l}
          </sp-menu-item>`
        )}
      </sp-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-locale-picker': NpLocalePicker;
  }
}
