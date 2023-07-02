declare module '*.css' {
  import type { CSSResult } from 'lit'
  export const styles: CSSResult
  export default styles
}

declare module '*.scss' {
  import { CSSResult } from 'lit'
  const styles: CSSResult
  export default styles
}
