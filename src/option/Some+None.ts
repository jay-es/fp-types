import { equalFn } from "../utils";

interface IOption {
  isSome(): boolean;
  isNone(): boolean;
  get(): unknown;
  value(defaultValue: unknown): unknown;
  equal(other: IOption, fn?: (v1: unknown, v2: unknown) => boolean): boolean;
  bind<U>(fn: (value: unknown) => Some<U>): IOption;
  map<U>(fn: (value: unknown) => U): IOption;
  fold<U>(none: U, fn: (value: unknown) => U): U;
  iter(fn: (value: unknown) => void): void;
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

  value(defaultValue: T): T {
    return this.#value;
  }

  equal(
    other: Some<T> | None,
    fn: (v1: T, v2: T) => boolean = equalFn
  ): boolean {
    return other.isSome() && fn(this.#value, other.get());
  }

  bind<U>(fn: (value: T) => Some<U>): Some<U> {
    return fn(this.#value);
  }

  map<U>(fn: (value: T) => U): Some<U> {
    return new Some(fn(this.#value));
  }

  fold<U>(none: U, fn: (value: T) => U): U {
    return fn(this.#value);
  }

  iter(fn: (value: T) => void): void {
    fn(this.#value);
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

  equal<T>(
    other: Some<T> | None,
    fn: (v1: never, v2: T) => boolean = equalFn
  ): boolean {
    return other.isNone();
  }

  bind<U>(fn: (value: never) => Some<U>): None {
    return new None();
  }

  map<U>(fn: (value: never) => U): None {
    return new None();
  }

  fold<U>(none: U, fn: (value: never) => U): U {
    return none;
  }

  iter(fn: (value: never) => void): void {
    // no-op
  }
}
