import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { Effect } from 'effect'
import postcss, { type AcceptedPlugin } from 'postcss'
import * as sass from 'sass'
import { CSSCompilationError, type ReadingFileError } from './errors.js'
import type { InjectStylePluginOptions as PluginOptions } from './index.js'
import { printLog, readFile } from './utils.js'

interface CSSProcessingOptions {
  from: string
  options: Required<PluginOptions>
}

export const cssProcessing = ({
  from,
  options: { minify: isMinificationActive, debug: isDebugActive }
}: CSSProcessingOptions): Effect.Effect<
  never,
  CSSCompilationError | ReadingFileError,
  string
> =>
  readFile(from).pipe(
    Effect.flatMap(rawContent => sassTask(rawContent)),
    Effect.tap(css => printLog(isDebugActive, '💬 SASS Compiled', css)),
    Effect.flatMap(css => postcssTask(from, css, isMinificationActive)),
    Effect.tap(css => printLog(isDebugActive, '💬 PostCSS Compiled', css)),
    Effect.flatMap(css => Effect.succeed(css))
  )

// --- Tasks
const sassTask = (
  source: string
): Effect.Effect<never, CSSCompilationError, string> =>
  Effect.tryPromise({
    try: () => sass.compileStringAsync(source),
    catch: error => new CSSCompilationError('sass', error)
  }).pipe(Effect.flatMap(output => Effect.succeed(output.css)))

const postcssTask = (
  from: string,
  source: string,
  minification: boolean
): Effect.Effect<never, CSSCompilationError, string> => {
  const plugins = postcssPlugins(minification)

  return Effect.tryPromise({
    try: () => postcss(plugins).process(source, { from }),
    catch: error => new CSSCompilationError('postcss', error)
  }).pipe(Effect.flatMap(output => Effect.succeed(output.css)))
}

const postcssPlugins = (minification: boolean): AcceptedPlugin[] =>
  minification ? [autoprefixer, cssnano] : [autoprefixer]
