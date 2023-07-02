type ErrorBoundaryTag =
  | 'BrowserlistError'
  | 'CSSCompilationError'
  | 'FileSystemError'

export class ErrorBoundary extends Error {
  public readonly _tag: ErrorBoundaryTag

  public constructor(tag: ErrorBoundaryTag, message: string) {
    super(message)

    // eslint-disable-next-line no-underscore-dangle
    this._tag = tag
    this.name = this.constructor.name
  }
}

export class BrowserlistError extends ErrorBoundary {
  public constructor(error: unknown) {
    super(
      'BrowserlistError',
      `An error has occurred when retrieving targets from the browser list:\n${String(
        error
      )}`
    )
  }
}

export class CSSCompilationError extends ErrorBoundary {
  public constructor(error: unknown) {
    super(
      'CSSCompilationError',
      `When LightningCSS tried to compile the CSS, an error occurred:\n${String(
        error
      )}`
    )
  }
}

interface FileSystemErrorOptions {
  type: 'read' | 'unlink'
  path: string
}

export class FileSystemError extends ErrorBoundary {
  public constructor(error: unknown, options: FileSystemErrorOptions) {
    super(
      'FileSystemError',
      `An error occurred when attempting to ${options.type} the file "${
        options.path
      }":\n${String(error)}`
    )
  }
}
