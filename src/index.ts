import { litCssPlugin } from './core/plugin.js'

export interface LitCssPluginOptions {
  /**
   * A custom [Browserlist](https://browsersl.ist/) query to specify which browsers to target for CSS compatibility.
   * Default: `> 0.5%, last 2 versions, Firefox ESR, not dead`.
   */
  browserlistQuery?: string
  /**
   * Enable debugging mode for the plugin.
   * Default: `false`.
   */
  debug?: boolean
  /**
   * Lightning CSS compiles [specifications](https://lightningcss.dev/transpilation.html#draft-syntax) not yet available in browsers.
   * You may disable them to speed up the process.
   * Default: `false`.
   */
  disableDraftSpecs?: boolean
  /**
   * Enable minification of generated CSS to reduce the bundle size.
   * Default: esbuild options or otherwise `false`.
   */
  minify?: boolean
  /**
   * Generate source maps for the CSS output.
   * Default: esbuild options or otherwise `false`.
   */
  sourceMap?: boolean
}

export { litCssPlugin }

// eslint-disable-next-line no-restricted-exports
export default litCssPlugin
