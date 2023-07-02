import type { BuildOptions } from 'esbuild'
import { injectStylePlugin } from '../src/main.js'

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
  entryPoints: ['./src/main.ts'],
  outdir: './lib',
  platform: 'node',
  target: ['es2020', 'node16']
}

export const DEMO_CONFIG: BuildOptions = {
  ...COMMON_CONFIG,
  entryPoints: ['./demo/src/index.ts'],
  outdir: './demo/public',
  platform: 'browser',
  target: ['es2020'],
  plugins: [injectStylePlugin()]
}
