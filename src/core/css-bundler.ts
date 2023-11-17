import browserslist from 'browserslist'
import { Effect } from 'effect'
import { type PartialMessage } from 'esbuild'
import {
  bundleAsync,
  browserslistToTargets,
  type Drafts,
  type Targets,
  type TransformResult,
  type Warning
} from 'lightningcss'
import { type LitCssPluginOptions as PluginOptions } from '../index.js'
import { PLUGIN_NAME } from './constants.js'
import { BrowserlistError, CSSCompilationError } from './errors.js'
import { printLog } from './utils.js'

interface CssBundlerOptions extends Required<PluginOptions> {
  sourceFile: string
}

interface CSSBundlerResult {
  css: Uint8Array
  map: Uint8Array | null
  warnings: PartialMessage[]
}

export const cssBundler = ({
  sourceFile,
  browserlistQuery,
  debug: isDebugActive,
  includeDraftSpecs: isDraftSpecsIncluded,
  minify: isMinificationRequired,
  sourceMap: isSourceMapRequired
}: CssBundlerOptions): Effect.Effect<
  never,
  CSSCompilationError,
  CSSBundlerResult
> =>
  lightningCss({
    sourceFile,
    browserlistQuery,
    isDraftSpecsIncluded,
    isMinificationRequired,
    isSourceMapRequired
  }).pipe(
    Effect.flatMap(result =>
      Effect.succeed({
        css: result.code,
        map: result.map ? result.map : null,
        warnings: transformWarnings(result.warnings)
      })
    ),
    Effect.tap(result =>
      printLog(isDebugActive, '✅ CSS compiling finished', result.css)
    ),
    Effect.flatMap(({ css, map, warnings }) =>
      Effect.succeed({
        css,
        map,
        warnings
      })
    )
  )

interface LightningCssOptions {
  sourceFile: string
  browserlistQuery: string
  isDraftSpecsIncluded: boolean
  isMinificationRequired: boolean
  isSourceMapRequired: boolean
}

const lightningCss = ({
  sourceFile,
  browserlistQuery,
  isDraftSpecsIncluded,
  isMinificationRequired,
  isSourceMapRequired
}: LightningCssOptions): Effect.Effect<
  never,
  BrowserlistError | CSSCompilationError,
  TransformResult
> =>
  browserlist(browserlistQuery).pipe(
    Effect.flatMap(targets =>
      Effect.tryPromise({
        try: () =>
          // Lightning CSS Bundler
          // Ref. https://lightningcss.dev/bundling.html
          bundleAsync({
            targets,
            filename: sourceFile,
            minify: isMinificationRequired,
            sourceMap: isSourceMapRequired,
            drafts: getDraftSpecs(isDraftSpecsIncluded)
          }),
        catch: error => new CSSCompilationError(error)
      })
    )
  )

const browserlist = (
  query: string
): Effect.Effect<never, BrowserlistError, Targets> =>
  Effect.sync(() => browserslist(query)).pipe(
    Effect.flatMap(targets =>
      Effect.try({
        try: () => browserslistToTargets(targets),
        catch: error => new BrowserlistError(error)
      })
    )
  )

const getDraftSpecs = (isDraftSpecsIncluded: boolean): Drafts =>
  isDraftSpecsIncluded
    ? {}
    : {
        customMedia: true
      }

const transformWarnings = (lightningCSSWarnings: Warning[]): PartialMessage[] =>
  lightningCSSWarnings.map(warn => ({
    pluginName: PLUGIN_NAME,
    text: warn.message,
    location: {
      file: warn.loc.filename,
      line: warn.loc.line,
      column: warn.loc.column
    }
  }))
