import { PLUGIN_CONFIG } from './config/constants.js'
import { build } from './config/esbuild.js'

await build(PLUGIN_CONFIG)
