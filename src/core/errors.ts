export class CSSCompilationError {
  public readonly _tag = 'CSSCompilationError'
  public readonly message: string

  public constructor(
    public readonly type: 'postcss',
    public readonly error: unknown
  ) {
    this.message = this.composeErrorMessage(error, type)
  }

  private composeErrorMessage(error: unknown, type: string): string {
    const errorStr = String(error)

    return `There was an error while trying to compile the ${type} code:\n${errorStr}`
  }
}

interface FileSystemErrorOptions {
  path: string
  type: 'read' | 'unlink'
}

export class FileSystemError {
  public readonly _tag = 'FileSystemError'
  public readonly message: string

  public constructor(
    public readonly error: unknown,
    public readonly options: FileSystemErrorOptions
  ) {
    this.message = this.composeErrorMessage(error, options)
  }

  private composeErrorMessage(
    error: unknown,
    options: FileSystemErrorOptions
  ): string {
    const errorStr = String(error)

    return `An error occurred when attempting to ${options.type} the file "${options.path}":\n${errorStr}`
  }
}
