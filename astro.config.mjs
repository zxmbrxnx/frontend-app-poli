// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [db()],

  adapter: node({
    mode: 'standalone'
  })
});