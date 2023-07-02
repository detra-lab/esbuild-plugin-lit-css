import { defineConfig } from 'tsup'

type Config = ReturnType<typeof defineConfig>

const config: Config = opt => {
  const minify = opt.minify ? 'terser' : false

  return {
    minify,
    clean: true,
    outDir: 'lib',
    entry: ['src/index.ts'],
    format: ['esm'],
    target: 'es2020',
    platform: 'node',
    dts: true,
    sourcemap: false,
    splitting: false
  }
}

// eslint-disable-next-line no-restricted-exports
export default defineConfig(config)
