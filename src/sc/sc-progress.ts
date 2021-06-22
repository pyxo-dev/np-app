import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';

@customElement('sc-progress')
export class ScProgress extends LitElement {
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

  // Tracks async operations which are in progress.
  private _opsInProgress = new Set<string>();

  @state() private _opsInProgressCount = 0;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('np:progressstart', this._handleProgressStart);
    window.addEventListener('np:progressend', this._handleProgressEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('np:progressstart', this._handleProgressStart);
    window.removeEventListener('np:progressend', this._handleProgressEnd);
  }

  render() {
    return this._opsInProgressCount
      ? html`<sp-progress-bar indeterminate></sp-progress-bar>`
      : '';
  }

  private _handleProgressStart = (e: CustomEvent) => {
    this._opsInProgress.add(e.detail.id);
    this._opsInProgressCount = this._opsInProgress.size;
  };

  private _handleProgressEnd = (e: CustomEvent) => {
    this._opsInProgress.delete(e.detail.id);
    this._opsInProgressCount = this._opsInProgress.size;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-progress': ScProgress;
  }

  interface WindowEventMap {
    'np:progressstart': CustomEvent;
    'np:progressend': CustomEvent;
  }
}
