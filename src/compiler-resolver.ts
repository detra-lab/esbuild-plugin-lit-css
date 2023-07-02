import { join } from 'node:path'
import { Effect } from 'effect'
import type {
  OnLoadArgs,
  OnLoadResult,
  OnResolveArgs,
  OnResolveResult
} from 'esbuild'
import { cssProcessing } from './css-processing.js'

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
  verbose: boolean
}

export const onLoadResolver = ({
  path,
  verbose
}: OnLoadResolver): Promise<OnLoadResult> =>
  Effect.runPromise(
    Effect.match(cssProcessing({ from: path, verbose }), {
      onSuccess: contents => ({
        contents,
        loader: 'text' as const
      }),
      onFailure: error => ({
        errors: [{ text: error.message }]
      })
    })
  )
