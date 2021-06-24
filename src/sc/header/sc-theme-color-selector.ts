import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import type { Color } from '@spectrum-web-components/theme';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { I18nController } from '../../i18n/i18n-controller.js';
import { tc } from '../../i18n/utils.js';
import { DEFAULT_COLOR } from '../sc-theme.js';

function selectColor(e: Event) {
  const color = (e.target as Picker).value as Color;
  window.dispatchEvent(
    new CustomEvent('np:theme:colorselection', {
      detail: { color },
    })
  );
}

@customElement('sc-theme-color-selector')
export class ScThemeColorSelector extends LitElement {
  private _i18nController = new I18nController(this);

  render() {
    return html`
      <sp-field-label for="theme-color-picker" side-aligned="end">
        ${tc('theme-color-picker-label')}
      </sp-field-label>
      <sp-picker
        id="theme-color-picker"
        quiet
        value=${DEFAULT_COLOR}
        @change=${selectColor}
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
    'sc-theme-color-selector': ScThemeColorSelector;
  }
}
