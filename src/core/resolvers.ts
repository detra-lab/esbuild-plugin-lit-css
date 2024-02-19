import { join } from 'node:path'
import { Effect } from 'effect'
import {
  type OnLoadArgs,
  type OnLoadResult,
  type OnResolveArgs,
  type OnResolveResult
} from 'esbuild'
import { type LitCssPluginOptions as PluginOptions } from '../index.js'
import { cssBundler } from './css-bundler.js'
import { stringifyUint8 } from './utils.js'

interface OnResolveResolver extends OnResolveArgs {
  namespace: string
}

export const onResolveResolver = ({
  path,
  namespace,
  resolveDir
}: OnResolveResolver): OnResolveResult => ({
  namespace,
  path: join(resolveDir, path)
})

interface OnLoadResolver extends OnLoadArgs {
  options: Required<PluginOptions>
}

export const onLoadResolver = ({
  path,
  options
}: OnLoadResolver): Promise<OnLoadResult> =>
  Effect.runPromise(
    Effect.match(cssBundler({ sourceFile: path, ...options }), {
      onSuccess: ({ css, map, warnings }) => ({
        warnings,
        contents: composeContents(css, map),
        loader: 'text' as const
      }),
      onFailure: error => ({
        errors: [{ text: error.message }]
      })
    })
  )

const composeContents = (
  css: Uint8Array,
  map: Uint8Array | null
): string | Uint8Array =>
  map === null
    ? css
    : `${stringifyUint8(css)}//# sourceMappingURL=${stringifyUint8(map)}`
