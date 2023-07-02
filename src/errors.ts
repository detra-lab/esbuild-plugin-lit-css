export class CSSCompilationError {
  public readonly _tag = "CSSCompilationError";
  public readonly message: string;
  public readonly process: "postcss" | "sass";

  public constructor(
    public readonly type: "postcss" | "sass",
    public readonly error: unknown,
  ) {
    this.process = type;
    this.message = String(error);
  }
}

export class ReadingFileError {
  public readonly _tag = "CSSCompilationError";
  public readonly message: string;

  public constructor(public readonly error: unknown) {
    this.message = String(error);
  }
}
