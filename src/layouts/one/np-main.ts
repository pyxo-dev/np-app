import { css, customElement, html, LitElement } from 'lit-element';

@customElement('np-main')
export class NpMain extends LitElement {
  static styles = css`
    #page {
      padding: 40px 52px 24px 52px;
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
    }

    @media screen and (max-width: 768px) {
      #page {
        padding: 40px 16px 24px 16px;
      }
    }
  `;

  render() {
    return html`
      <main role="main">
        <div id="page">
          <slot></slot>
        </div>
      </main>
    `;
  }
}
