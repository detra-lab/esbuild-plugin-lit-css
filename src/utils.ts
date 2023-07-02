import * as crypto from 'node:crypto'
import { Console, Effect } from 'effect'
import { PLUGIN_NAME } from './constants.js'

export const generateRandomUUID = (): string =>
  `${PLUGIN_NAME}_${crypto.randomUUID({})}`

export const printLog = (
  debugMode: boolean,
  ...rest: string[]
): Effect.Effect<never, never, void> =>
  debugMode ? Console.log(rest.join('\n')) : Effect.succeed(undefined)
