import { css, customElement, html, LitElement } from 'lit-element';

@customElement('np-aside')
export class NpAside extends LitElement {
  static styles = css`
    :host {
      background-color: var(--spectrum-global-color-gray-100);
    }

    aside {
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow: auto;
    }

    @media screen and (max-width: 960px) {
      aside {
        position: fixed;
        top: 0;
        left: 0;
        transition: transform
          var(
            --spectrum-dialog-confirm-background-entry-animation-duration,
            var(--spectrum-global-animation-duration-600)
          )
          cubic-bezier(0, 0, 0.4, 1);
        transform: translateX(-100%);
        z-index: 10;
        background: inherit;
        min-height: 100vh;
      }

      :host([open]) aside {
        transform: translateX(0);
      }
    }

    #navigation {
      width: var(--spectrum-global-dimension-size-2400);
      padding: 0 24px 24px 24px;
      flex: 1;
      flex-grow: 1;
      overflow: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  `;

  render() {
    return html`
      <aside>
        <div id="navigation">
          <slot></slot>
        </div>
      </aside>
    `;
  }
}
