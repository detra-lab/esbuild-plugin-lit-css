/* eslint-disable no-console */

import { Effect } from 'effect'
import { type BuildOptions, type BuildResult } from 'esbuild'
import * as esbuild from 'esbuild'

export type { BuildOptions }

export const build = (config: BuildOptions): Promise<void> =>
  Effect.runPromise(
    Effect.match(esbuildTask(config), {
      onSuccess() {
        console.log('⚡️ Build successful')
      },
      onFailure(reason) {
        console.error('💥 Build failed', reason)
        process.exit(1)
      }
    })
  )

const esbuildTask = (
  config: BuildOptions
): Effect.Effect<never, unknown, BuildResult> =>
  Effect.tryPromise(() => esbuild.build(config))
