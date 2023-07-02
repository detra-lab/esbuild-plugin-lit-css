import { litCssPlugin } from '../src/core/plugin.js'
import { type BuildOptions } from './esbuild.js'

const COMMON_CONFIG: BuildOptions = {
  format: 'esm',
  sourcemap: false,
  splitting: false,
  treeShaking: true
}

export const PLUGIN_CONFIG: BuildOptions = {
  ...COMMON_CONFIG,
  bundle: false,
  minify: true,
  platform: 'node',
  target: ['es2020', 'node16'],
  entryPoints: ['./src/index.ts'],
  outdir: './lib'
}

export const DEMO_CONFIG: BuildOptions = {
  ...COMMON_CONFIG,
  bundle: true,
  minify: false,
  platform: 'browser',
  target: ['es2020'],
  entryPoints: ['./demo/src/index.ts'],
  outdir: './demo/out',
  plugins: [litCssPlugin({ debug: true })]
}
