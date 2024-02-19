import * as path from 'node:path'
import { Effect } from 'effect'
import esbuild, { type BuildOptions } from 'esbuild'

export const esbuildRun = async (
  outFile: string,
  options: BuildOptions
): Promise<void> => {
  await esbuild.build({
    logLevel: 'silent',
    bundle: true,
    format: 'esm',
    platform: 'node',
    entryPoints: ['./tests/fixture/index.ts'],
    outfile: `./tests/fixture/${outFile}`,
    ...options
  })
}

export const getSourcePaths = (): Effect.Effect<string[]> => {
  const basePath = path.resolve(__dirname, 'fixture')

  const removeCapitalSlash = (s: string): string => s.substring(1)

  return Effect.sync(() => [
    removeCapitalSlash(path.join(basePath, 'styles.css')),
    removeCapitalSlash(path.join(basePath, '_root.css'))
  ])
}

export const getSourceMap = (
  sources: string[],
  sourcesContent: string[]
): Effect.Effect<string, unknown> =>
  Effect.try(() =>
    JSON.stringify({
      version: 3,
      sourceRoot: null,
      mappings:
        'ACAA;;;;ADEA;;;;AAIA;;;;AAGE;;;;;AAIA;;;;;AAIA;EAAqC;;;;;AAKvC;;;;;;;AAWA;EACE',
      sources,
      sourcesContent,
      names: []
    })
  )
