import * as path from 'node:path'
import { Effect } from 'effect'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { PLUGIN_NAME } from '../src/core/constants.js'
import { deleteFile, generateRandomUUID } from '../src/core/utils.js'
import { litCssPlugin } from '../src/index.js'
import {
  ROOT_SOURCE,
  STYLES_SOURCE,
  CSS_MINIFIED,
  CSS_NOT_MINIFIED,
  CSS_WITH_DRAFT_SPECS
} from './constants.js'
import { esbuildRun, getSourceMap, getSourcePaths } from './utils.js'

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

    expect(out.rawCss).toBe(CSS_NOT_MINIFIED)
  })

  test('should provide a compiled and minified CSS within a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ minify: true })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_MINIFIED)
  })

  test('should provide a compiled and minified CSS when using the esbuild minify option instead of the plugin one', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      minify: true,
      plugins: [litCssPlugin()]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_MINIFIED)
  })

  test('should ignore the esbuild minify option if the plugin one is configured', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      minify: true,
      plugins: [litCssPlugin({ minify: false })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_NOT_MINIFIED)
  })

  test('should provide a compiled CSS with draft CSS specs not transpiled', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ disableDraftSpecs: true })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.rawCss).toBe(CSS_WITH_DRAFT_SPECS)
  })

  test('should provide a compiled CSS with the inline source map inside a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ sourceMap: true })]
    })

    const out = await import(`./fixture/${outfileName}`)

    const cssSourcePaths = Effect.runSync(getSourcePaths())

    const sourceMap = Effect.runSync(
      getSourceMap(cssSourcePaths, [STYLES_SOURCE, ROOT_SOURCE])
    )

    expect(out.rawCss).toBe(
      `${CSS_NOT_MINIFIED}//# sourceMappingURL=${sourceMap}`
    )
  })

  test('should print the output of the Lightning CSS compilation', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ debug: true })]
    })

    expect(logSpy).toHaveBeenCalledTimes(1)

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      `✅ CSS compiling finished\n${CSS_NOT_MINIFIED}`
    )
  })

  test('should print the minified output of the Lightning CSS compilation', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await esbuildRun(outfileName, {
      plugins: [litCssPlugin({ debug: true, minify: true })]
    })

    expect(logSpy).toHaveBeenCalledTimes(1)

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      `✅ CSS compiling finished\n${CSS_MINIFIED}`
    )
  })
})
