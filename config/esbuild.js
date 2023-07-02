/* eslint-disable no-console */

import esbuild from 'esbuild'
import { COMMON_CONFIG } from './constants.js'

await esbuild
  .build({
    ...COMMON_CONFIG,
    minify: true,
    platform: 'node',
    target: ['es2020', 'node16'],
    entryPoints: ['./src/index.ts'],
    outdir: './lib'
  })
  .then(() => {
    console.log('⚡️ Build successful')
  })
  .catch(reason => {
    console.error('💥 Build failed', reason)
    process.exit(1)
  })
