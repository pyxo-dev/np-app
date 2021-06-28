import {
  createRequest,
  OperationContext,
  OperationResult,
  TypedDocumentNode,
} from '@urql/core';
import { DocumentNode } from 'graphql';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { onEnd, onStart, pipe, subscribe } from 'wonka';
import { fint } from '../i18n/i18n.js';
import { client } from './urql.js';

export interface QueryControllerOpts<
  Data = any,
  Variables extends object = {}
> {
  query: DocumentNode | TypedDocumentNode<Data, Variables> | string;
  variables?: Variables & { lang?: string };
  context?: Partial<OperationContext>;

  progressEvent?: boolean;
  hostUpdateOnLangChangeDisabled?: boolean;
}

export class QueryController<Data = any, Variables extends object = {}>
  implements ReactiveController
{
  host: ReactiveControllerHost;

  result: Partial<OperationResult<Data, Variables>> & { fetching?: boolean };

  opts: QueryControllerOpts<Data, Variables>;

  updateRequested = false;

  constructor(
    host: ReactiveControllerHost,
    opts: QueryControllerOpts<Data, Variables>
  ) {
    this.host = host;
    this.result = { fetching: false };
    this.opts = opts;
    host.addController(this);
  }

  unsubscribe = () => {};

  subscribe = () => {
    let detail: Record<'id', string>;
    if (this.opts.progressEvent) {
      const { key } = createRequest(this.opts.query, this.opts.variables);
      detail = { id: key.toString() };
    }

    const { unsubscribe } = pipe(
      client.query(this.opts.query, this.opts.variables, this.opts.context),

      onStart(() => {
        this.result.fetching = true;
        this.requestHostUpdate();
        if (this.opts.progressEvent) {
          window.dispatchEvent(new CustomEvent('np:progressstart', { detail }));
        }
      }),

      onEnd(() => {
        this.result.fetching = false;
        this.requestHostUpdate();
        if (this.opts.progressEvent) {
          window.dispatchEvent(new CustomEvent('np:progressend', { detail }));
        }
      }),

      subscribe(result => {
        this.result = result;
        this.requestHostUpdate();
        if (this.opts.progressEvent) {
          window.dispatchEvent(new CustomEvent('np:progressend', { detail }));
        }
      })
    );

    this.unsubscribe = unsubscribe;
  };

  hostConnected() {
    this.subscribe();
    if (!this.opts.hostUpdateOnLangChangeDisabled) {
      window.addEventListener('np:i18n:langchange', this.handleLangChange);
    }
  }

  hostDisconnected() {
    this.unsubscribe();
    window.removeEventListener('np:i18n:langchange', this.handleLangChange);
  }

  handleLangChange = () => {
    if (
      this.opts.variables &&
      Object.keys(this.opts.variables).includes('lang')
    ) {
      this.unsubscribe();
      this.opts.variables.lang = fint.lang;
      this.subscribe();
    }
  };

  requestHostUpdate = () => {
    this.updateRequested = true;
    this.host.requestUpdate();
    this.host.updateComplete.then(() => {
      this.updateRequested = false;
    });
  };
}
