import { html, LitElement, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './styles.css'

@customElement('sample-element')
export class SampleElement extends LitElement {
  public static override styles = styles

  @property()
  public name = 'World'

  public override render(): TemplateResult {
    return html`
      <div class="wrapper">
        <h1>Hello, ${this.name}!</h1>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sample-element': SampleElement
  }
}
