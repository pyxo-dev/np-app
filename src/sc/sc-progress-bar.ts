import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('sc-progress-bar')
export class ScProgressBar extends LitElement {
  static styles = css`
    :host {
      --spectrum-progressbar-m-width: 100vw;
      --spectrum-progressbar-m-height: var(--spectrum-global-dimension-size-25);
      --spectrum-progressbar-m-border-radius: 0;
      --spectrum-progressbar-m-indeterminate-duration: var(
        --spectrum-global-animation-duration-4000
      );

      position: fixed;
    }
  `;

  render() {
    return html`<sp-progress-bar indeterminate></sp-progress-bar>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-progress-bar': ScProgressBar;
  }
}
