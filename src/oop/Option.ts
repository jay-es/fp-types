import { equalFn } from "~/src/shared/utils";
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
    return new this("Some", value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static none<T = any>(): Option<T> {
    return new this("None");
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

  bind<U>(fn: (value: T) => Option<U>): Option<U> {
    if (this.isSome()) {
      return fn(this[vvv]);
    }

    return Option.none<U>();
  }

  map<U>(fn: (value: T) => U): Option<U> {
    if (this.isSome()) {
      return Option.some(fn(this[vvv]));
    }

    return Option.none<U>();
  }

  fold<U>(none: U, fn: (value: T) => U): U {
    if (this.isSome()) {
      return fn(this[vvv]);
    }

    return none;
  }

  iter(fn: (value: T) => void): void {
    if (this.isSome()) {
      fn(this[vvv]);
    }
  }

  toResult<E>(none: E): Result<T, E> {
    if (this.isSome()) {
      return Result.ok(this[vvv]);
    }

    return Result.err(none);
  }
}
