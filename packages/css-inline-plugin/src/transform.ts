import { OnLoadArgs } from 'esbuild'
import postcss from 'postcss'
import * as sass from 'sass'

const compileSass = async (input: string): Promise<string> => {
  const { css: output } = await sass.compileStringAsync(input)
  return output
}

const compilePostcss = async (input: string): Promise<string> => {
  const { css: output } = await postcss().process(input)
  return output
}

export const transform = async (
  input: string,
  _: OnLoadArgs
): Promise<string> => {
  const sassResult = await compileSass(input)

  const result = await compilePostcss(sassResult)

  return result
}
