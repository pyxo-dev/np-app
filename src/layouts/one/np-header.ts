import { customElement, html, LitElement } from 'lit-element';

@customElement('np-header')
export class NpHeader extends LitElement {
  render() {
    return html`
      <header>
        <slot></slot>
      </header>
    `;
  }
}
