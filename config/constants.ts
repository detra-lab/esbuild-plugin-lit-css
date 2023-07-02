import type { BuildOptions } from 'esbuild'
import { injectStylePlugin } from '../src/core/plugin.js'

const COMMON_CONFIG: BuildOptions = {
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap: false,
  splitting: false,
  treeShaking: true
}

export const PLUGIN_CONFIG: BuildOptions = {
  ...COMMON_CONFIG,
  entryPoints: ['./src/index.ts'],
  outdir: './lib',
  platform: 'node',
  target: ['es2020', 'node16']
}

export const DEMO_CONFIG: BuildOptions = {
  ...COMMON_CONFIG,
  entryPoints: ['./demo/src/index.ts'],
  outdir: './demo/out',
  platform: 'browser',
  target: ['es2020'],
  plugins: [injectStylePlugin({ debug: true })]
}
