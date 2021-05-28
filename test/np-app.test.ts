import { html, fixture, expect } from '@open-wc/testing';

import { NpApp } from '../src/np-app';

describe('NpApp', () => {
  let element: NpApp;
  beforeEach(async () => {
    element = await fixture(html`<np-app></np-app>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
