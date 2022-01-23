interface IResult {
  isOk(): boolean;
  isErr(): boolean;
  value(defaultValue: unknown): unknown;
  getOk(): unknown;
  getErr(): unknown;
}

export class Ok<T> implements IResult {
  readonly #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): false {
    return false;
  }

  value(defaultValue: T): T {
    return this.#value;
  }

  getOk(): T {
    return this.#value;
  }

  getErr(): never {
    throw new Error("Cannot get Err from Ok");
  }
}

export class Err<E> implements IResult {
  readonly #error: E;

  constructor(error: E) {
    this.#error = error;
  }

  isOk(): false {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  value<T>(defaultValue: T): T {
    return defaultValue;
  }

  getOk(): never {
    throw new Error("Cannot get Ok from Err");
  }

  getErr(): E {
    return this.#error;
  }
}
