/* eslint-disable no-console */

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Plugin, PluginBuild } from 'esbuild'
import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_FILTER,
  PLUGIN_NAME
} from './constants.js'
import { transform } from './transform.js'
import { isError } from './utils.js'

interface PluginOptions {
  filter?: RegExp
}

export const cssInline = (options: PluginOptions = {}): Plugin => {
  const { filter = DEFAULT_FILTER } = options

  const namespace = `_${Math.random().toString(36).substr(2, 9)}`

  return {
    name: PLUGIN_NAME,

    setup(build: PluginBuild) {
      build.onResolve({ filter }, args => {
        const path = join(args.resolveDir, args.path)

        return {
          path,
          namespace
        }
      })

      build.onLoad({ filter: /.*/, namespace }, async args => {
        try {
          const input = await readFile(args.path, 'utf8')

          console.log('__INPUT__', input)

          const output = await transform(input, args)

          console.log('__OUTPUT__', output)

          return { contents: output, loader: 'text' }
        } catch (err: unknown) {
          const text = isError(err) ? err.message : DEFAULT_ERROR_MESSAGE

          console.log('__ERROR__', (err as { message: string }).message)

          return {
            errors: [{ text }]
          }
        }
      })
    }
  }
}
