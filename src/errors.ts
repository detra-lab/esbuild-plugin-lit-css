export class CSSCompilationError {
  public readonly _tag = 'CSSCompilationError'
  public readonly message: string

  public constructor(
    public readonly type: 'postcss' | 'sass',
    public readonly error: unknown
  ) {
    this.message = this.composeErrorMessage(error, type)
  }

  private composeErrorMessage(error: unknown, type: string): string {
    const errorStr = String(error)

    return `There was an error while trying to compile the ${type} code:\n${errorStr}`
  }
}
