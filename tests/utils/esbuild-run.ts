import esbuild, { type BuildOptions } from 'esbuild'

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
