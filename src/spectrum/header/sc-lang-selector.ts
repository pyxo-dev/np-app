import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/picker/sp-picker.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { I18nController } from '../../i18n/i18n-controller.js';
import { fint } from '../../i18n/i18n.js';
import { tc } from '../../i18n/utils.js';
import { router } from '../../router/router.js';
import { goto } from '../../router/utils.js';

async function handleChange(e: Event) {
  const lang = (e.target as Picker).value;

  const pathname = window.location.href.replace(window.location.origin, '');
  const data = await router.resolve({ pathname });

  const translation = data?.meta?.translations?.[lang];

  if (translation) {
    goto(`${lang}/${translation}`);
  } else {
    goto(lang);
  }
}

@customElement('sc-lang-selector')
export class ScLangSelector extends LitElement {
  private i18nController = new I18nController(this);

  render() {
    return html`
      <sp-field-label for="lang-picker" side-aligned="end">
        ${tc('language-picker-label')}
      </sp-field-label>
      <sp-picker
        id="lang-picker"
        quiet
        value=${fint.lang}
        @change=${handleChange}
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
