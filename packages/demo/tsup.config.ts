import { cssInline } from '@detra-lab/esbuild-plugin-css-inline'
import { defineConfig } from 'tsup'

type Config = ReturnType<typeof defineConfig>

const config: Config = {
  clean: false,
  outDir: 'public',
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2020',
  platform: 'browser',
  dts: false,
  sourcemap: false,
  splitting: false,
  esbuildPlugins: [cssInline({ log: true })]
}

// eslint-disable-next-line no-restricted-exports
export default defineConfig(config)
