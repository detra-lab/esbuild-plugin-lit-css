import { html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './styles.css'

@customElement('sample-element')
export class SampleElement extends LitElement {
  public static override styles = styles

  @property()
  public name = 'World'

  public override render(): TemplateResult {
    return html`<h1>Hello, ${this.name}!</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sample-element': SampleElement
  }
}
