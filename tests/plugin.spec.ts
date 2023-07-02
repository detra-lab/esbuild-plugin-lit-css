import * as path from 'node:path'
import { Effect } from 'effect'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { PLUGIN_NAME } from '../src/core/constants.js'
import { deleteFile, generateRandomUUID } from '../src/core/utils.js'
import { litCssPlugin } from '../src/index.js'
import {
  CSS_SOURCE,
  CSS_OUTPUT_MINIFIED,
  CSS_OUTPUT_NOT_MINIFIED
} from './constants.js'
import { esbuildRun, getSourceMap, getSourcePath } from './utils.js'

let outfileName = 'tmp-file.js'

afterEach(async () => {
  const tmpFilePath = path.join(__dirname, 'fixture', outfileName)
  await Effect.runPromise(deleteFile(tmpFilePath))
})

describe(PLUGIN_NAME, () => {
  test('should provide a compiled CSS within a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin()]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_OUTPUT_NOT_MINIFIED)
  })

  test('should provide a compiled and minified CSS within a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ minify: true })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_OUTPUT_MINIFIED)
  })

  test('should provide a compiled and minified CSS when using the esbuild minify option instead of the plugin one', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      minify: true,
      plugins: [litCssPlugin()]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_OUTPUT_MINIFIED)
  })

  test('should ignore the esbuild minify option if the plugin one is configured', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      minify: true,
      plugins: [litCssPlugin({ minify: false })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_OUTPUT_NOT_MINIFIED)
  })

  test('should print the output of the Lightning CSS compilation', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ debug: true })]
    })

    expect(logSpy).toHaveBeenCalledTimes(2)

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      `✅ CSS compiling finished\n${CSS_OUTPUT_NOT_MINIFIED}`
    )

    expect(logSpy).toHaveBeenNthCalledWith(2, '⚡️ Build successful')
  })

  test('should print the minified output of the Lightning CSS compilation', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ debug: true, minify: true })]
    })

    expect(logSpy).toHaveBeenCalledTimes(2)

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      `✅ CSS compiling finished\n${CSS_OUTPUT_MINIFIED}`
    )

    expect(logSpy).toHaveBeenNthCalledWith(2, '⚡️ Build successful')
  })

  test('should provide a compiled CSS with the inline source map inside a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ sourceMap: true })]
    })

    const out = await import(`./fixture/${outfileName}`)

    const cssSourcePath = Effect.runSync(getSourcePath())

    const sourceMap = Effect.runSync(
      getSourceMap([cssSourcePath], [CSS_SOURCE])
    )

    expect(out.rawCss).toBe(
      `${CSS_OUTPUT_NOT_MINIFIED}//# sourceMappingURL=${sourceMap}`
    )
  })
})
