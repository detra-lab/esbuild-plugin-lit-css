import * as crypto from 'node:crypto'
import * as fs from 'node:fs/promises'
import { Console, Effect } from 'effect'
import { PLUGIN_NAME } from './constants.js'
import { FileSystemError } from './errors.js'

export const deleteFile = (
  path: string
): Effect.Effect<void, FileSystemError> =>
  Effect.tryPromise({
    try: () => fs.unlink(path),
    catch: error => new FileSystemError(error, { path, type: 'read' })
  })

export const generateRandomUUID = (): string =>
  `${PLUGIN_NAME}_${crypto.randomUUID({})}`

export const printLog = (
  debugMode: boolean,
  ...rest: unknown[]
): Effect.Effect<void> =>
  debugMode ? Console.log(rest.join('\n')) : Effect.succeed(undefined)

export const readFile = (
  path: string
): Effect.Effect<string, FileSystemError> =>
  Effect.tryPromise({
    try: async () => await fs.readFile(path, { encoding: 'utf8' }),
    catch: error => new FileSystemError(error, { path, type: 'read' })
  })

export const stringifyUint8 = (a: Uint8Array): string => a.toString()
