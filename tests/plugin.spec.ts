import * as nodepath from 'node:path'
import { Effect } from 'effect'
import esbuild, { type BuildOptions } from 'esbuild'
import { afterEach, describe, expect, test } from 'vitest'
import { PLUGIN_NAME } from '../src/constants.js'
import { injectStylePlugin } from '../src/index.js'
import { cleanFile } from './utils/cleanFile.js'

const esbuildConfig: BuildOptions = {
  bundle: true,
  format: 'esm',
  entryPoints: ['./tests/fixture/index.ts'],
  outfile: './tests/fixture/tmp-out.js',
  plugins: [injectStylePlugin()]
}

afterEach(async () => {
  const outFile = nodepath.join(__dirname, 'fixture', 'tmp-out.js')
  await Effect.runPromise(cleanFile(outFile))
})

describe(PLUGIN_NAME, () => {
  test('should provide a computed CSS within a JavaScript file', async () => {
    await esbuild.build(esbuildConfig)

    // @ts-expect-error
    const out = await import('./fixture/tmp-out.js')

    expect(out.sass).toBe(
      '.wrapper {\n  padding: 16px;\n}\n.wrapper > h1 {\n  color: rebeccapurple;\n}'
    )
  })
})
