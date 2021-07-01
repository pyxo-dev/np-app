import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import { gql } from '@urql/core';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { QueryController } from '../../graphql/query-controller.js';
import { fint } from '../../i18n/i18n.js';
import { pt } from '../../i18n/utils.js';
import '../../np/np-full-page-loader.js';
import { handleLink } from '../../router/utils.js';

const query = gql`
  query BlogPostLcList($lang: String!) {
    blogPostLcList(lang: $lang) {
      slug
      title
      summary
    }
  }
`;

interface NpBlogPostLc {
  id: string;
  postId: string;
  lang: string;
  slug: string;
  title: string;
  body: string;
  summary?: string;
  picture?: string;
  weight?: number;
}

type NpBlogPostLcList = NpBlogPostLc[];

@customElement('sc-blog-post-lc-list')
export class ScBlogPostLcList extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
      grid-gap: 1rem;
    }

    sp-card {
      cursor: pointer;
    }
  `;

  private queryController = new QueryController<
    Record<'blogPostLcList', NpBlogPostLcList>,
    { lang: string }
  >(this, { query, variables: { lang: fint.lang } });

  constructor() {
    super();
    this.onclick = handleLink;
  }

  render() {
    const list = this.queryController.result.data?.blogPostLcList;

    return this.queryController.result.fetching
      ? html`
          <sp-progress-circle size="large" indeterminate> </sp-progress-circle>
        `
      : html`
          ${list?.map(
            post => html`
              <sp-card
                heading=${post.title}
                href="${fint.lang}/${pt('blog')}/${post.slug}"
              >
                <div slot="body">${post.summary || ''}</div>
              </sp-card>
            `
          )}
        `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sc-blog-post-lc-list': ScBlogPostLcList;
  }
}
