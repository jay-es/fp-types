import { compareFn, equalFn, makeNever } from "~/shared/helpers";
import { flow } from "~/utils";
import { Result } from "./Result";

const vvv = Symbol();

type Some<T> = {
  [vvv]: T;
};

type None = {
  [vvv]?: undefined;
};

type Type = "Some" | "None";

export class Option<T> {
  readonly #type: Type;
  readonly [vvv]?: T;

  private constructor(type: Type, value?: T) {
    this.#type = type;
    this[vvv] = value;
  }

  static some<T>(value: T): Option<T> {
    return new Option("Some", value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static none<T = any>(): Option<T> {
    return new Option("None");
  }

  private match<U, N>(someFn: (value: T) => U, none: N): U | N {
    if (this.isSome()) return someFn(this[vvv]);
    if (this.isNone()) return none;
    return makeNever(this.#type);
  }

  isSome(): this is Some<T> {
    return this.#type === "Some";
  }

  isNone(): this is None {
    return this.#type === "None";
  }

  value(defaultValue: T): T {
    return this.isSome() ? this[vvv] : defaultValue;
  }

  get(): T {
    if (this.isSome()) {
      return this[vvv];
    }

    throw new Error("Cannot get value of None");
  }

  equal(other: Option<T>, fn: (v1: T, v2: T) => boolean = equalFn): boolean {
    if (this.isSome() && other.isSome()) {
      return fn(this[vvv], other[vvv]);
    }

    return this.isNone() && other.isNone();
  }

  compare(other: Option<T>, fn: (v1: T, v2: T) => number = compareFn): number {
    if (this.isSome() && other.isSome()) {
      return fn(this[vvv], other[vvv]);
    }

    return compareFn(this.isSome(), other.isSome());
  }

  bind<U>(fn: (value: T) => Option<U>): Option<U> {
    return this.match(fn, Option.none<U>());
  }

  map<U>(fn: (value: T) => U): Option<U> {
    return this.match(flow(fn, Option.some), Option.none<U>());
  }

  fold<U>(none: U, fn: (value: T) => U): U {
    return this.match(fn, none);
  }

  iter(fn: (value: T) => void): void {
    if (this.isSome()) {
      fn(this[vvv]);
    }
  }

  toResult<E>(none: E): Result<T, E> {
    return this.match(Result.ok, Result.err(none));
  }
}
