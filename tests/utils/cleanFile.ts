import * as nodefs from 'node:fs/promises'
import { Effect } from 'effect'

export const cleanFile = (path: string): Effect.Effect<never, string, void> =>
  Effect.tryPromise({
    try: () => nodefs.unlink(path),
    catch: error =>
      `An error occurred when attempting to clean the file "${path}":\n${String(
        error
      )}`
  })
