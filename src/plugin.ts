import type { BuildOptions, Plugin, PluginBuild } from 'esbuild'
import { DEFAULT_FILTER, PLUGIN_NAME } from './constants.js'
import type { InjectStylePluginOptions as PluginOptions } from './index.js'
import { onLoadResolver, onResolveResolver } from './resolvers.js'
import { generateRandomUUID } from './utils.js'

export const injectStylePlugin = (
  pluginOptions: PluginOptions = {}
): Plugin => {
  const namespace = generateRandomUUID()

  return {
    name: PLUGIN_NAME,

    setup({ initialOptions, onLoad, onResolve }: PluginBuild) {
      const options = getOptions(initialOptions, pluginOptions)

      onResolve({ filter: DEFAULT_FILTER }, args =>
        onResolveResolver({ ...args, namespace })
      )

      onLoad({ filter: /.*/, namespace }, args =>
        onLoadResolver({ ...args, options })
      )
    }
  }
}

// --- Plugin Options
const getOptions = (
  esbuildOptions: BuildOptions,
  pluginOptions: PluginOptions
): Required<PluginOptions> => ({
  minify: pluginOptions.minify ?? esbuildOptions.minify ?? false,
  debug: pluginOptions.debug ?? esbuildOptions.logLevel === 'debug'
})
