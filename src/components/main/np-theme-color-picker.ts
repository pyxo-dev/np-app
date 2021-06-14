import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { tc } from '../../i18n/index.js';
import { DEFAULT_COLOR } from '../../np-theme.js';

@customElement('np-theme-color-picker')
export class NpThemeColorPicker extends LitElement {
  private _updateThemeColor(e: Event) {
    this.dispatchEvent(
      new CustomEvent('np:theme-color-update', {
        bubbles: true,
        composed: true,
        detail: { color: (e.target as Picker).value },
      })
    );
  }

  render() {
    return html`
      <sp-field-label for="theme-color-picker" side-aligned="end">
        ${tc('theme-color-picker-label')}
      </sp-field-label>
      <sp-picker
        id="theme-color-picker"
        quiet
        value=${DEFAULT_COLOR}
        @change=${this._updateThemeColor}
      >
        <sp-menu-item value="lightest">${tc('lightest')}</sp-menu-item>
        <sp-menu-item value="light">${tc('light')}</sp-menu-item>
        <sp-menu-item value="dark">${tc('dark')}</sp-menu-item>
        <sp-menu-item value="darkest">${tc('darkest')}</sp-menu-item>
      </sp-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-theme-color-picker': NpThemeColorPicker;
  }
}
