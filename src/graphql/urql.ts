import { createClient } from '@urql/core';
import opts from './conf.js';

export const client = createClient(opts);
