import { join } from 'node:path'
import { Effect } from 'effect'
import type {
  OnLoadArgs,
  OnLoadResult,
  OnResolveArgs,
  OnResolveResult
} from 'esbuild'
import { cssProcessing } from './css-processing.js'
import type { InjectStylePluginOptions as PluginOptions } from './index.js'

interface OnResolveResolver extends OnResolveArgs {
  namespace: string
}

export const onResolveResolver = ({
  namespace,
  resolveDir,
  path
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
    Effect.match(cssProcessing({ from: path, options }), {
      onSuccess: contents => ({
        contents,
        loader: 'text' as const
      }),
      onFailure: error => ({
        errors: [{ text: error.message }]
      })
    })
  )
