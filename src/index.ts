/* eslint-disable no-restricted-exports */

import { injectStylePlugin } from './plugin.js'

export interface InjectStylePluginOptions {
  debug?: boolean
  minify?: boolean
}

export { injectStylePlugin }
export default injectStylePlugin
