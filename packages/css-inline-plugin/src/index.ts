import type { Plugin, PluginBuild } from 'esbuild'

interface PluginOptions {
  log?: boolean
}

export const cssInline = (options: PluginOptions = {}): Plugin => {
  const { log = false } = options

  return {
    name: 'esbuild-plugin-css-inline',

    async setup(build: PluginBuild) {
      if (log) {
        // eslint-disable-next-line no-console
        console.log('__OPTIONS__', options)

        // eslint-disable-next-line no-console
        console.log('__BUILD__', build)
      }
    }
  }
}
