import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import { gql } from '@urql/core';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { QueryController } from '../../graphql/query-controller.js';
import { fint } from '../../i18n/i18n.js';
import '../../np/np-full-page-loader.js';

const query = gql`
  query BlogList($lang: String!) {
    blogPostLcList(languageTag: $lang) {
      title
      summary
    }
  }
`;

interface NpBlogPostLc {
  id: string;
  postId: string;
  languageTag: string;
  slug: string;
  title: string;
  body: string;
  summary?: string;
  picture?: string;
  weight?: number;
}

type NpBlogPostLcList = NpBlogPostLc[];

@customElement('sc-blog-list')
export class ScBlogList extends LitElement {
  private queryController = new QueryController<
    Record<'blogPostLcList', NpBlogPostLcList>,
    { lang: string }
  >(this, { query, variables: { lang: fint.lang } });

  render() {
    const list = this.queryController.result.data?.blogPostLcList;

    return !this.queryController.result.fetching
      ? html`
          ${list?.map(
            post => html`
              <sp-card heading=${post.title}>
                <div slot="body">${post.summary || ''}</div>
              </sp-card>
            `
          )}
        `
      : html`<sp-progress-circle
          size="large"
          indeterminate
        ></sp-progress-circle>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-blog-list': ScBlogList;
  }
}
