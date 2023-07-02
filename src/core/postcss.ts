import cssnano from 'cssnano'
import { Effect } from 'effect'
import postcssCompiler, { type AcceptedPlugin } from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'
import type { InjectStylePluginOptions as PluginOptions } from '../index.js'
import { CSSCompilationError, type FileSystemError } from './errors.js'
import { printLog, readFile } from './utils.js'

interface CSSProcessingOptions extends Required<PluginOptions> {
  from: string
}

export const cssProcessing = ({
  from,
  debug: isDebugActive,
  minify: isMinificationActive
}: CSSProcessingOptions): Effect.Effect<
  never,
  FileSystemError | CSSCompilationError,
  string
> =>
  readFile(from).pipe(
    Effect.tap(rawContent =>
      printLog(
        isDebugActive,
        `🔎 Checking the contents of "${from}"`,
        rawContent
      )
    ),
    Effect.flatMap(rawCssContent =>
      postcssTask({ from, rawCssContent, isMinificationActive })
    ),
    Effect.tap(css =>
      printLog(isDebugActive, '✅ PostCSS processing completed', css)
    ),
    Effect.flatMap(css => Effect.succeed(css))
  )

interface PostcssTaskOptions {
  from: string
  rawCssContent: string
  isMinificationActive: boolean
}

const postcssTask = ({
  from,
  rawCssContent,
  isMinificationActive
}: PostcssTaskOptions): Effect.Effect<never, CSSCompilationError, string> => {
  return postcssPlugins(isMinificationActive)
    .pipe(
      Effect.flatMap(plugins =>
        Effect.tryPromise({
          try: () => postcssCompiler(plugins).process(rawCssContent, { from }),
          catch: error => new CSSCompilationError('postcss', error)
        })
      )
    )
    .pipe(Effect.flatMap(result => Effect.succeed(result.css)))
}

const postcssPlugins = (
  isMinificationActive: boolean
): Effect.Effect<never, never, AcceptedPlugin[]> =>
  Effect.sync(() =>
    isMinificationActive
      ? [
          // @ts-expect-error
          // Ref. https://github.com/csstools/postcss-plugins/issues/1031
          postcssPresetEnv({ autoprefixer: false }),
          cssnano
        ]
      : [postcssPresetEnv]
  )
