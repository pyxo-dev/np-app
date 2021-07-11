import 'carbon-web-components/es/components/breadcrumb/breadcrumb-item.js';
import 'carbon-web-components/es/components/breadcrumb/breadcrumb-link.js';
import 'carbon-web-components/es/components/breadcrumb/breadcrumb.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('cc-breadcrumb')
export class CcBreadcrumb extends LitElement {
  render() {
    return html`
      <bx-breadcrumb>
        <bx-breadcrumb-item>
          <bx-breadcrumb-link href="/#">Breadcrumb 1</bx-breadcrumb-link>
        </bx-breadcrumb-item>
        <bx-breadcrumb-item>
          <bx-breadcrumb-link href="/#">Breadcrumb 2</bx-breadcrumb-link>
        </bx-breadcrumb-item>
        <bx-breadcrumb-item>
          <bx-breadcrumb-link href="/#" aria-current="page"
            >Breadcrumb 3</bx-breadcrumb-link
          >
        </bx-breadcrumb-item>
      </bx-breadcrumb>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-breadcrumb': CcBreadcrumb;
  }
}
