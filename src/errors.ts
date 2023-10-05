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

export class ReadingFileError {
  public readonly _tag = 'ReadingFileError'
  public readonly message: string

  public constructor(
    public readonly error: unknown,
    path: string
  ) {
    this.message = this.composeErrorMessage(error, path)
  }

  private composeErrorMessage(error: unknown, path: string): string {
    const errorStr = String(error)

    return `An error occurred when attempting to read the file "${path}":\n${errorStr}`
  }
}
