import * as path from 'node:path'
import { Effect } from 'effect'
import { build, type BuildOptions } from '../config/esbuild.js'

export const esbuildRun = async (
  outFile: string,
  options: BuildOptions
): Promise<void> => {
  await build({
    logLevel: 'silent',
    bundle: true,
    format: 'esm',
    platform: 'node',
    entryPoints: ['./tests/fixture/index.ts'],
    outfile: `./tests/fixture/${outFile}`,
    ...options
  })
}

export const getSourcePath = (): Effect.Effect<never, never, string> =>
  Effect.sync(() =>
    path.resolve(__dirname, 'fixture', 'styles.css').substring(1)
  )

export const getSourceMap = (
  sources: string[],
  sourcesContent: string[]
): Effect.Effect<never, unknown, string> =>
  Effect.try(() =>
    JSON.stringify({
      version: 3,
      sourceRoot: null,
      mappings:
        'AAAA;;;;AAIA;;;;AAIA;;;;AAGE;;;;;AAIA;;;;;AAIA;EAAqC;;;;;AAKvC;;;;;;;AAWA;EACE',
      sources,
      sourcesContent,
      names: []
    })
  )
