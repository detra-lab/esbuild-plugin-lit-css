import type { Plugin, PluginBuild } from 'esbuild'
import { onLoadResolver, onResolveResolver } from './compiler-resolver.js'
import { DEFAULT_FILTER, PLUGIN_NAME } from './constants.js'
import { generateRandomUUID } from './utils.js'

interface PluginOptions {
  verbose?: boolean
}

const DEFAULT_OPTIONS: Required<PluginOptions> = {
  verbose: false
}

export const injectStylePlugin = (options = DEFAULT_OPTIONS): Plugin => {
  const namespace = generateRandomUUID()

  return {
    name: PLUGIN_NAME,

    setup(build: PluginBuild) {
      build.onResolve({ filter: DEFAULT_FILTER }, args =>
        onResolveResolver({ ...args, namespace })
      )

      build.onLoad({ filter: /.*/, namespace }, args =>
        onLoadResolver({ ...args, ...options })
      )
    }
  }
}
