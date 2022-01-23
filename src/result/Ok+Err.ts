interface IResult {
  isOk(): boolean;
  isErr(): boolean;
  value(defaultValue: unknown): unknown;
  getOk(): unknown;
  getErr(): unknown;
  bind(fn: (value: unknown) => unknown): IResult;
  map(fn: (value: unknown) => unknown): IResult;
  mapErr(fn: (value: unknown) => unknown): IResult;
  fold<U>(okFn: (value: unknown) => U, errFn: (error: unknown) => U): U;
  iter(fn: (value: unknown) => void): void;
  iterErr(fn: (value: unknown) => void): void;
  // TODO: toOption(): Option<unknown>;
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

  bind<U>(fn: (value: T) => Ok<U>): Ok<U> {
    return fn(this.#value);
  }

  map<U>(fn: (value: T) => U): Ok<U> {
    return new Ok(fn(this.#value));
  }

  mapErr<F>(fn: (error: never) => F): Ok<T> {
    return new Ok(this.#value);
  }

  fold<U>(okFn: (value: T) => U, errFn: (error: never) => U): U {
    return okFn(this.#value);
  }

  iter(fn: (value: T) => void): void {
    fn(this.#value);
  }

  iterErr(fn: (value: never) => void): void {
    // no-op
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

  bind<U>(fn: (value: never) => Ok<U>): Err<E> {
    return new Err(this.#error);
  }

  map<U>(fn: (value: never) => U): Err<E> {
    return new Err(this.#error);
  }

  mapErr<F>(fn: (error: E) => F): Err<F> {
    return new Err(fn(this.#error));
  }

  fold<U>(okFn: (value: never) => U, errFn: (error: E) => U): U {
    return errFn(this.#error);
  }

  iter(fn: (value: never) => void): void {
    // no-op
  }

  iterErr(fn: (value: E) => void): void {
    fn(this.#error);
  }
}
