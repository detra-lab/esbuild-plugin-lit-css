/* eslint-disable no-duplicate-imports */
/* eslint-disable no-restricted-exports */

declare module "*.css" {
  import type { CSSResult } from "lit";
  const styles: CSSResult;
  export default styles;
}

declare module "*.scss" {
  import type { CSSResult } from "lit";
  const styles: CSSResult;
  export default styles;
}

declare module "*.sass" {
  import type { CSSResult } from "lit";
  const styles: CSSResult;
  export default styles;
}
