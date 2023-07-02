import * as fs from 'node:fs/promises'
import { Effect } from 'effect'
import esbuild, { type BuildOptions } from 'esbuild'
import { FileSystemError } from '../src/core/errors.js'

export const esbuildRun = async (
  outFile: string,
  options: BuildOptions
): Promise<void> => {
  await esbuild.build({
    bundle: true,
    format: 'esm',
    platform: 'node',
    entryPoints: ['./tests/fixture/index.ts'],
    outfile: `./tests/fixture/${outFile}`,
    ...options
  })
}

export const deleteFile = (
  path: string
): Effect.Effect<never, FileSystemError, void> =>
  Effect.tryPromise({
    try: () => fs.unlink(path),
    catch: error => new FileSystemError(error, { path, type: 'read' })
  })
