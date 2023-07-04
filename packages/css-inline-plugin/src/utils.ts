import * as O from 'fp-ts/lib/Option.js'
import { pipe } from 'fp-ts/lib/function.js'

export const isObject = (x: unknown): x is object => x === Object(x)

export const isError = (x: unknown): x is { message: string } =>
  pipe(
    O.fromNullable(x),
    O.filter(isObject),
    O.filter(obj => Object.hasOwn(obj, 'message')),
    O.isSome
  )
