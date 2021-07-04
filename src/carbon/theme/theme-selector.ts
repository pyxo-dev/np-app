import type { BXDropdown } from 'carbon-web-components';
import 'carbon-web-components/es/components/dropdown/dropdown-item.js';
import 'carbon-web-components/es/components/dropdown/dropdown.js';
import type { CarbonTheme } from 'carbon/theme/utils.js';
import { defaultTheme } from 'carbon/theme/utils.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { I18nController } from 'src/i18n/i18n-controller.js';
import { tc } from 'src/i18n/utils.js';

function handleSelection(e: Event) {
  const theme = (e.target as BXDropdown).value as CarbonTheme;
  window.dispatchEvent(
    new CustomEvent('np:theme-selection', { detail: { theme } })
  );
}

@customElement('cc-theme-selector')
export class CcThemeSelector extends LitElement {
  private i18nController = new I18nController(this);

  render() {
    return html`
      <bx-dropdown
        value=${defaultTheme}
        @bx-dropdown-selected=${handleSelection}
        trigger-content="Select theme"
        type="inline"
      >
        <bx-dropdown-item value="g100">${tc('darkest')}</bx-dropdown-item>
        <bx-dropdown-item value="g90">${tc('dark')}</bx-dropdown-item>
        <bx-dropdown-item value="g10">${tc('light')}</bx-dropdown-item>
        <bx-dropdown-item value="white">${tc('lightest')}</bx-dropdown-item>
      </bx-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-theme-selector': CcThemeSelector;
  }
}
