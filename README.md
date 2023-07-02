# esbuild-plugin-lit-css

[![NPM Version][npm_version_badge]][npm_badge_url]
[![NPM Downloads][npm_downloads_badge]][npm_badge_url]
[![CI Status][ci_badge]][ci_badge_url]

An [esbuild](https://esbuild.github.io/) plugin created to handle the CSS of a Lit component with [Lightning CSS](https://lightningcss.dev/), an extremely fast CSS parser, transformer, bundler, and minifier.

- [esbuild-plugin-lit-css](#esbuild-plugin-lit-css)
  - [Installation and Usage](#installation-and-usage)
  - [Plugin Options](#plugin-options)
  - [TypeScript](#typescript)
  - [License](#license)

## Installation and Usage

1. Install the NPM package of the plugin, along with esbuild itself:

   ```sh
   pnpm add -D @detra-lab/esbuild-plugin-lit-css esbuild
   ```

2. Add the plugin to your esbuild configuration:

   ```ts
   // ./esbuild.ts

   import { litCssPlugin } from '@detra-lab/esbuild-plugin-lit-css'
   // You can also use the default export if you prefer:
   // import litCssPlugin from '@detra-lab/esbuild-plugin-lit-css'

   await esbuild.build({
     // ...
     plugins: [litCssPlugin()]
   })
   ```

3. Import the CSS within the file that hosts the Lit component. If you encounter type issues with CSS file imports, check out the [TypeScript section](#typescript).

   ```ts
   // ./src/components/hello-world

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

4. Run the esbuild script with [ts-node](https://github.com/TypeStrong/ts-node). You should be able to compile the component's styles successfully.

   ```sh
   ts-node-esm ./esbuild.ts
   ```

## Plugin Options

You can pass several options to the plugin, which by default reference those passed to esbuild.

| Option           | Type    | Default                                                    |
| ---------------- | ------- | ---------------------------------------------------------- |
| browserlistQuery | string  | `> 0.5%, last 2 versions, Firefox ESR, not dead`.          |
| debug            | boolean | The esbuild `logLevel` property set to `debug`.            |
| minify           | boolean | The esbuild `minify` property or `false` if not specified. |
| sourceMap        | boolean | A specified value for the `sourceMap` property of esbuild. |

## TypeScript

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

## License

[Apache License 2.0](./LICENSE)

<!-- Badges -->

[ci_badge]: https://img.shields.io/github/actions/workflow/status/detra-lab/esbuild-plugin-lit-css/test.yaml?style=flat-square&colorA=424394&colorB=80ffdb
[npm_version_badge]: https://img.shields.io/npm/v/@detra-lab/esbuild-plugin-lit-css?style=flat-square&colorA=424394&colorB=80ffdb
[npm_downloads_badge]: https://img.shields.io/npm/dm/@detra-lab/esbuild-plugin-lit-css?style=flat-square&colorA=424394&colorB=80ffdb

<!-- Links -->

[ci_badge_url]: https://github.com/detra-lab/esbuild-plugin-lit-css/actions/workflows/test.yaml
[npm_badge_url]: https://www.npmjs.com/package/@detra-lab/esbuild-plugin-lit-css
