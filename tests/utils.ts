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
