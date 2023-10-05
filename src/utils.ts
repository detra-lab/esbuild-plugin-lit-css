import * as crypto from 'node:crypto'
import * as nodefs from 'node:fs/promises'
import { Console, Effect } from 'effect'
import { ReadingFileError } from './errors.js'

export const generateRandomUUID = (): string => crypto.randomUUID()

export const printLog = (
  debugMode: boolean,
  ...rest: string[]
): Effect.Effect<never, never, void> =>
  debugMode ? Console.log(rest.join('\n')) : Effect.succeed(undefined)

export const readFile = (
  path: string
): Effect.Effect<never, ReadingFileError, string> =>
  Effect.tryPromise({
    try: () => nodefs.readFile(path, 'utf8'),
    catch: error => new ReadingFileError(error, path)
  })
