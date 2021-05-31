import { css, customElement, html, LitElement } from 'lit-element';

@customElement('np-header')
export class NpHeader extends LitElement {
  static styles = css`
    header {
      width: 100%;
    }
  `;
  render() {
    return html`
      <header>
        <slot></slot>
      </header>
    `;
  }
}
