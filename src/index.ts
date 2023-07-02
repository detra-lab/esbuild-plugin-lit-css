import { litCssPlugin } from './core/plugin.js'

export interface LitCssPluginOptions {
  /**
   * A custom [Browserlist](https://browsersl.ist/) query to specify which browsers to target for CSS compatibility.
   * If not provided, the default query will be used: `> 0.5%, last 2 versions, Firefox ESR, not dead`
   */
  browserlistQuery?: string

  /**
   * Enable debugging mode for the plugin.
   */
  debug?: boolean

  /**
   * Enable minification of generated CSS to reduce the bundle size.
   */
  minify?: boolean

  /**
   * Generate source maps for the CSS output.
   */
  sourceMap?: boolean
}

export { litCssPlugin }

// eslint-disable-next-line no-restricted-exports
export default litCssPlugin
