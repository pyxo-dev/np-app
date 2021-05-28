import { customElement, html, LitElement } from 'lit-element';
import './layouts/one/np-layout';

@customElement('np-app')
export class NpApp extends LitElement {
  render() {
    return html`<np-layout></np-layout>`;
  }
}
