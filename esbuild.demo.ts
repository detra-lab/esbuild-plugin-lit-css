import { DEMO_CONFIG } from './config/constants.js'
import { build } from './config/esbuild.js'

await build(DEMO_CONFIG)
