import * as path from 'node:path'
import { Effect } from 'effect'

import { afterEach, describe, expect, test, vi } from 'vitest'
import { PLUGIN_NAME } from '../src/constants.js'
import { injectStylePlugin } from '../src/index.js'
import { generateRandomUUID } from '../src/utils.js'
import { cleanFile } from './utils/clean-file.js'
import { esbuildRun } from './utils/esbuild-run.js'

let outfileName = 'tmp-file.js'

afterEach(async () => {
  const tmpFilePath = path.join(__dirname, 'fixture', outfileName)
  await Effect.runPromise(cleanFile(tmpFilePath))
})

describe(PLUGIN_NAME, () => {
  test('should provide pre-processed CSS within a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [injectStylePlugin()]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.sass).toBe(
      '.partial {\n  border-radius: 8px;\n}\n\n.wrapper {\n  padding: 16px;\n}\n.wrapper > h1 {\n  color: rebeccapurple;\n}'
    )
  })

  test('should provide pre-processed and minified CSS within a JavaScript file', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      plugins: [injectStylePlugin({ minify: true })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.sass).toBe(
      '.partial{border-radius:8px}.wrapper{padding:16px}.wrapper>h1{color:#639}'
    )
  })

  test('should provide pre-processed and minified CSS when using the esbuild minify option instead of the plugin one', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      minify: true,
      plugins: [injectStylePlugin()]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.sass).toBe(
      '.partial{border-radius:8px}.wrapper{padding:16px}.wrapper>h1{color:#639}'
    )
  })

  test('should ignore the esbuild minify option if the plugin one is configured', async () => {
    outfileName = generateRandomUUID()

    await esbuildRun(outfileName, {
      minify: true,
      plugins: [injectStylePlugin({ minify: false })]
    })

    const out = await import(`./fixture/${outfileName}`)

    expect(out.sass).toBe(
      '.partial {\n  border-radius: 8px;\n}\n\n.wrapper {\n  padding: 16px;\n}\n.wrapper > h1 {\n  color: rebeccapurple;\n}'
    )
  })

  test('should print the output of the sass and postcss compilation', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await esbuildRun(outfileName, {
      plugins: [injectStylePlugin({ debug: true })]
    })

    expect(logSpy).toHaveBeenCalledTimes(2)
    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      '🔥 SASS Processed\n.partial {\n  border-radius: 8px;\n}\n\n.wrapper {\n  padding: 16px;\n}\n.wrapper > h1 {\n  color: rebeccapurple;\n}'
    )
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      '🔥 PostCSS Processed\n.partial {\n  border-radius: 8px;\n}\n\n.wrapper {\n  padding: 16px;\n}\n.wrapper > h1 {\n  color: rebeccapurple;\n}'
    )
  })

  test('should print the minified output of the sass and postcss compilation', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await esbuildRun(outfileName, {
      plugins: [injectStylePlugin({ debug: true, minify: true })]
    })

    expect(logSpy).toHaveBeenCalledTimes(2)
    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      '🔥 SASS Processed\n.partial {\n  border-radius: 8px;\n}\n\n.wrapper {\n  padding: 16px;\n}\n.wrapper > h1 {\n  color: rebeccapurple;\n}'
    )
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      '🔥 PostCSS Processed\n.partial{border-radius:8px}.wrapper{padding:16px}.wrapper>h1{color:#639}'
    )
  })
})
