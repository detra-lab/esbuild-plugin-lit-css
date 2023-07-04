import type { CSSResult } from 'lit'

declare module '*.css' {
  const styles: CSSResult
  export default styles
}

declare module '*.scss' {
  const styles: CSSResult
  export default styles
}

declare module '*.sass' {
  const styles: CSSResult
  export default styles
}
