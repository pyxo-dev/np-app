import '@spectrum-web-components/underlay/sp-underlay';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './np-aside.css';

@customElement('np-aside')
export class NpAside extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) open = false;

  private close() {
    this.open = false;
  }

  render() {
    return html`<sp-underlay
        class="scrim"
        @click=${this.close}
        ?open=${this.open}
      ></sp-underlay>
      <aside>
        <div id="navigation">
          <slot></slot>
        </div>
      </aside>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'np-aside': NpAside;
  }
}
