/* eslint-disable no-restricted-exports */
declare module '*.css' {
  import { type CSSResult } from 'lit'
  const styles: CSSResult
  export default styles
}
