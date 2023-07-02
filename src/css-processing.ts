import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { Console, Effect } from 'effect'
import postcss from 'postcss'
import * as sass from 'sass'
import { CSSCompilationError, type ReadingFileError } from './errors.js'
import { readFile } from './utils.js'

const sassTask = (
  source: string
): Effect.Effect<never, CSSCompilationError, string> =>
  Effect.tryPromise({
    try: () => sass.compileStringAsync(source),
    catch: error => new CSSCompilationError('sass', error)
  }).pipe(Effect.flatMap(output => Effect.succeed(output.css)))

const postcssTask = (
  from: string,
  source: string
): Effect.Effect<never, CSSCompilationError, string> =>
  Effect.tryPromise({
    try: () => postcss([autoprefixer, cssnano]).process(source, { from }),
    catch: error => new CSSCompilationError('postcss', error)
  }).pipe(Effect.flatMap(output => Effect.succeed(output.css)))

interface CSSProcessingOptions {
  from: string
  verbose: boolean
}

export const cssProcessing = ({
  from
}: CSSProcessingOptions): Effect.Effect<
  never,
  CSSCompilationError | ReadingFileError,
  string
> =>
  readFile(from).pipe(
    Effect.flatMap(rawContent => sassTask(rawContent)),
    Effect.tap(css => Console.log('💬 SASS Compiled', css)),
    Effect.flatMap(css => postcssTask(from, css)),
    Effect.tap(css => Console.log('💬 PostCSS Compiled', css)),
    Effect.flatMap(css => Effect.succeed(css))
  )
