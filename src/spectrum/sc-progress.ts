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
  private opsInProgress = new Set<string>();

  @state() private opsInProgressCount = 0;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('np:progressstart', this.handleProgressStart);
    window.addEventListener('np:progressend', this.handleProgressEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('np:progressstart', this.handleProgressStart);
    window.removeEventListener('np:progressend', this.handleProgressEnd);
  }

  render() {
    return this.opsInProgressCount
      ? html`<sp-progress-bar indeterminate></sp-progress-bar>`
      : '';
  }

  private handleProgressStart = (e: CustomEvent<Record<'id', string>>) => {
    this.opsInProgress.add(e.detail.id);
    this.opsInProgressCount = this.opsInProgress.size;
  };

  private handleProgressEnd = (e: CustomEvent<Record<'id', string>>) => {
    this.opsInProgress.delete(e.detail.id);
    this.opsInProgressCount = this.opsInProgress.size;
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
