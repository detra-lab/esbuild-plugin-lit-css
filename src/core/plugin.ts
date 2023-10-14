import { type BuildOptions, type Plugin, type PluginBuild } from 'esbuild'
import { type LitCssPluginOptions as PluginOptions } from '../index.js'
import {
  DEFAULT_BROWSERLIST_QUERY,
  DEFAULT_FILTER,
  PLUGIN_NAME
} from './constants.js'
import { onLoadResolver, onResolveResolver } from './resolvers.js'
import { generateRandomUUID } from './utils.js'

export const litCssPlugin = (pluginOptions: PluginOptions = {}): Plugin => {
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

const getOptions = (
  esbuildOptions: BuildOptions,
  pluginOptions: PluginOptions
): Required<PluginOptions> => ({
  browserlistQuery: pluginOptions.browserlistQuery ?? DEFAULT_BROWSERLIST_QUERY,
  debug: pluginOptions.debug ?? esbuildOptions.logLevel === 'debug',
  disableDraftSpecs: pluginOptions.disableDraftSpecs ?? false,
  minify: pluginOptions.minify ?? esbuildOptions.minify ?? false,
  sourceMap: pluginOptions.sourceMap ?? Boolean(esbuildOptions.sourcemap)
})
