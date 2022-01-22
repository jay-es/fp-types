interface IOption {
  isSome(): boolean;
  isNone(): boolean;
  get(): unknown;
  value(defaultValue: unknown): unknown;
  // TODO: toResult(none: unknown): Result<unknown, unknown>;
}

export class Some<T> implements IOption {
  readonly #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): false {
    return false;
  }

  get(): T {
    return this.#value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value(defaultValue: T): T {
    return this.#value;
  }
}

export class None implements IOption {
  isSome(): false {
    return false;
  }

  isNone(): this is None {
    return true;
  }

  get(): never {
    throw new Error("Cannot get value of None");
  }

  value<T>(defaultValue: T): T {
    return defaultValue;
  }
}
