# esbuild-plugin-lit-css

[![NPM Version][npm_version_badge]][npm_badge_url]
[![NPM Downloads][npm_downloads_badge]][npm_badge_url]
[![CI Status][ci_badge]][ci_badge_url]

An [esbuild](https://esbuild.github.io/) plugin to transform a Lit component styles via [Lightning CSS](https://lightningcss.dev/): an extremely fast CSS parser, bundler, transformer, and minifier.

- [esbuild-plugin-lit-css](#esbuild-plugin-lit-css)
  - [About Lightning CSS and the Plugin](#about-lightning-css-and-the-plugin)
  - [Installation and Usage](#installation-and-usage)
  - [Plugin Options](#plugin-options)
  - [TypeScript Support](#typescript-support)
  - [Contributing](#contributing)
  - [License](#license)

## About Lightning CSS and the Plugin 

Lightning CSS is a tool written in Rust that empowers developers to use modern CSS features and future syntax today. It offers the following syntax transformations:

- [:dir() Selector](https://cssdb.org/#dir-pseudo-class)
- [:is() Selector](https://cssdb.org/#is-pseudo-class)
- [:not() Selector](https://cssdb.org/#not-pseudo-class)
- [Color Function](https://cssdb.org/#color-function)
- [Color Mix](https://cssdb.org/#color-mix)
- [Custom Media Queries](https://cssdb.org/#custom-media-queries)
- [Double Position Gradients](https://cssdb.org/#double-position-gradients)
- [Hex Colors with Alpha](https://cssdb.org/#hexadecimal-alpha-notation)
- [HWB Colors](https://cssdb.org/#hwb-function)
- [Lab Colors](https://cssdb.org/#lab-function)
- [Logical Properties](https://cssdb.org/#logical-properties-and-values)
- [Math Functions](https://drafts.csswg.org/css-values/#math)
- [Media Query Ranges](https://cssdb.org/#media-query-ranges)
- [Nesting](https://cssdb.org/#nesting-rules)
- [Relative Colors](https://cssdb.org/#lch-function)
- [system-ui font](https://cssdb.org/#system-ui-font-family)

Furthermore, Lightning CSS offers a range of built-in features, including:
- [Conditional Imports](https://lightningcss.dev/bundling.html#conditional-imports)
- [Vendor Prefixing](https://lightningcss.dev/transpilation.html#vendor-prefixing) (an Autoprefixer alternative)
- [Optimizazions and Minification](https://lightningcss.dev/minification.html) (a CSSNano alternative)
- [Shorthands](https://lightningcss.dev/transpilation.html#shorthands)

The plugin processes styles and returns them as a JavaScript or TypeScript string, offering a powerful and versatile tool for modern web development.

## Installation and Usage

1. Install the NPM package of the plugin, along with esbuild itself:

   ```sh
   pnpm add -D @detra-lab/esbuild-plugin-lit-css esbuild
   ```

2. Add the plugin to your esbuild configuration:

   ```js
   // ./esbuild.js

   import { litCssPlugin } from '@detra-lab/esbuild-plugin-lit-css'
   // You can also use the default export if you prefer:
   // import litCssPlugin from '@detra-lab/esbuild-plugin-lit-css'

   await esbuild.build({
     // Other esbuild options...
     plugins: [litCssPlugin()]
   })
   ```

3. Import the CSS within the file that hosts the Lit component. If you encounter type issues with CSS file imports, check out the [TypeScript section](#typescript).

   ```ts
   // ./src/components/hello-world.ts

   import { html, LitElement } from 'lit'
   import { customElement, property } from 'lit/decorators.js'

   import css from './styles.css'

   @customElement('hello-world')
   export class SampleElement extends LitElement {
     static styles = css

     @property()
     name = 'World'

     render() {
       return html`<h1>Hello, ${this.name}!</h1>`
     }
   }
   ```

4. Run the esbuild script with Node.js >=16. You should be able to compile the component's styles successfully.

   ```sh
   node ./esbuild.js
   ```

## Plugin Options

You can pass several options to the plugin, which by default reference those passed to esbuild.

| Option            | Type    | Default                                                                        |
| ----------------- | ------- | ------------------------------------------------------------------------------ |
| browserlistQuery  | string  | `> 0.5%, last 2 versions, Firefox ESR, not dead`.                              |
| debug             | boolean | The esbuild `logLevel` property is set to `debug` or `false` if not specified. |
| disableDraftSpecs | boolean | Lightning CSS [draft syntax](https://lightningcss.dev/transpilation.html#draft-syntax) is active by default. |
| minify            | boolean | The esbuild `minify` property or `false` if not specified.                     |
| sourceMap         | boolean | The esbuild `sourceMap` property or `false` if not specified.                  |

## TypeScript Support

If you encounter type issues when importing a CSS file within TypeScript code, you can add this line to your `tsconfig.json` file:

```jsonc
{
  "compilerOptions": {
    // ...
    "types": ["@detra-lab/esbuild-plugin-lit-css/declarations"]
  }
}
```

Alternatively, you can use a `*.d.ts` file (e.g. `esbuild-env.d.ts`), in the root of your project and use this syntax:

```ts
/// <reference types="@detra-lab/esbuild-plugin-lit-css/declarations" />
```

## Contributing

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes.

## License

[Apache License 2.0](./LICENSE)

<div align="center"><img src="https://raw.github.com/detra-lab/.github/stable/profile/logo.svg" width="100" height="100" alt="Detra" /><p><small>© 2023 Detra</small></p></div>

<!-- Badges -->
[ci_badge]: https://img.shields.io/github/actions/workflow/status/detra-lab/esbuild-plugin-lit-css/test.yaml?style=flat-square&colorA=424394&colorB=80ffdb
[npm_version_badge]: https://img.shields.io/npm/v/@detra-lab/esbuild-plugin-lit-css?style=flat-square&colorA=424394&colorB=80ffdb
[npm_downloads_badge]: https://img.shields.io/npm/dm/@detra-lab/esbuild-plugin-lit-css?style=flat-square&colorA=424394&colorB=80ffdb

<!-- Links -->
[ci_badge_url]: https://github.com/detra-lab/esbuild-plugin-lit-css/actions/workflows/test.yaml
[npm_badge_url]: https://www.npmjs.com/package/@detra-lab/esbuild-plugin-lit-css
