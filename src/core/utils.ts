import * as crypto from 'node:crypto'
import * as fs from 'node:fs/promises'
import { Console, Effect } from 'effect'
import { PLUGIN_NAME } from './constants.js'
import { FileSystemError } from './errors.js'

export const generateRandomUUID = (): string =>
  `${PLUGIN_NAME}_${crypto.randomUUID({})}`

export const printLog = (
  debugMode: boolean,
  ...rest: string[]
): Effect.Effect<never, never, void> =>
  debugMode ? Console.log(rest.join('\n')) : Effect.succeed(undefined)

export const readFile = (
  path: string
): Effect.Effect<never, FileSystemError, string> =>
  Effect.tryPromise({
    try: async () => await fs.readFile(path, { encoding: 'utf8' }),
    catch: error => new FileSystemError(error, { path, type: 'read' })
  })
