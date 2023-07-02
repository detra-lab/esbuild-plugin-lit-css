/* eslint-disable no-console */

import { litCssPlugin } from '@detra-lab/esbuild-plugin-lit-css'
import esbuild from 'esbuild'
import { COMMON_CONFIG } from './constants.js'

await esbuild
  .build({
    ...COMMON_CONFIG,
    platform: 'browser',
    target: ['es2020'],
    entryPoints: ['./demo/src/index.ts'],
    outdir: './demo/out',
    plugins: [litCssPlugin({ debug: true })]
  })
  .then(() => {
    console.log('⚡️ Build successful')
  })
  .catch(reason => {
    console.error('💥 Build failed', reason)
    process.exit(1)
  })
