import { Effect } from 'effect'
import type { InjectStylePluginOptions as PluginOptions } from '../index.js'
import { type CSSCompilationError, type FileSystemError } from './errors.js'
import { postcssTask } from './postcss.js'
import { printLog, readFile } from './utils.js'

interface CompilerOptions extends Required<PluginOptions> {
  from: string
}

export const compiler = ({
  from,
  debug: isDebugActive,
  minify: isMinificationActive
}: CompilerOptions): Effect.Effect<
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
