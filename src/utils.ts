import * as crypto from 'node:crypto'
import * as nodefs from 'node:fs/promises'
import { Effect } from 'effect'
import { ReadingFileError } from './errors.js'

export const readFile = (
  path: string
): Effect.Effect<never, ReadingFileError, string> =>
  Effect.tryPromise({
    try: () => nodefs.readFile(path, 'utf8'),
    catch: error => new ReadingFileError(error)
  })

export const generateRandomUUID = (): string => crypto.randomUUID()
