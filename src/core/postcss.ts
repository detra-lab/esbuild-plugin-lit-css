import cssnano from 'cssnano'
import { Effect } from 'effect'
import postcssCompiler, { type AcceptedPlugin } from 'postcss'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import { CSSCompilationError } from './errors.js'

interface PostcssTaskOptions {
  from: string
  rawCssContent: string
  isMinificationActive: boolean
}

export const postcssTask = ({
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
          postcssImport,
          // @ts-expect-error
          // Ref. https://github.com/csstools/postcss-plugins/issues/1031
          postcssPresetEnv({ autoprefixer: false }),
          cssnano
        ]
      : [postcssImport, postcssPresetEnv]
  )
