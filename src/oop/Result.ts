import { equalFn, makeNever } from "~/src/shared/utils";
import { Option } from "./Option";

const vvv = Symbol();
const eee = Symbol();

type Ok<T> = {
  [vvv]: T;
  [eee]?: undefined;
};

type Err<E> = {
  [vvv]?: undefined;
  [eee]: E;
};

type Type = "Ok" | "Err";

export class Result<T, E> {
  readonly #type: Type;
  readonly [vvv]?: T;
  readonly [eee]?: E;

  private constructor(
    param: { type: "Ok"; value: T } | { type: "Err"; error: E }
  ) {
    this.#type = param.type;
    if (param.type === "Ok") this[vvv] = param.value;
    if (param.type === "Err") this[eee] = param.error;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ok<T, E = any>(value: T): Result<T, E> {
    return new this({ type: "Ok", value });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static err<E, T = any>(error: E): Result<T, E> {
    return new this({ type: "Err", error });
  }

  isOk(): this is Ok<T> {
    return this.#type === "Ok";
  }

  isErr(): this is Err<E> {
    return this.#type === "Err";
  }

  value(defaultValue: T): T {
    return this.isOk() ? this[vvv] : defaultValue;
  }

  getOk(): T {
    if (this.isOk()) {
      return this[vvv];
    }

    throw new Error("Cannot get Ok from Err");
  }

  getErr(): E {
    if (this.isErr()) {
      return this[eee];
    }

    throw new Error("Cannot get Err from Ok");
  }

  equal(
    other: Result<T, E>,
    okFn: (v1: T, v2: T) => boolean = equalFn,
    errFn: (e1: E, e2: E) => boolean = equalFn
  ): boolean {
    if (this.isOk() && other.isOk()) {
      return okFn(this[vvv], other[vvv]);
    }

    if (this.isErr() && other.isErr()) {
      return errFn(this[eee], other[eee]);
    }

    return false;
  }

  bind<U>(okFn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return okFn(this[vvv]);
    }

    if (this.isErr()) {
      return Result.err(this[eee]);
    }

    return makeNever(this.#type);
  }

  map<U>(okFn: (value: T) => U): Result<U, E> {
    if (this.isOk()) {
      return Result.ok(okFn(this[vvv]));
    }

    if (this.isErr()) {
      return Result.err(this[eee]);
    }

    return makeNever(this.#type);
  }

  mapErr<F>(errFn: (error: E) => F): Result<T, F> {
    if (this.isOk()) {
      return Result.ok(this[vvv]);
    }

    if (this.isErr()) {
      return Result.err(errFn(this[eee]));
    }

    return makeNever(this.#type);
  }

  fold<U>(okFn: (value: T) => U, errFn: (error: E) => U): U {
    if (this.isOk()) {
      return okFn(this[vvv]);
    }

    if (this.isErr()) {
      return errFn(this[eee]);
    }

    return makeNever(this.#type);
  }

  iter(okFn: (value: T) => void): void {
    if (this.isOk()) {
      return okFn(this[vvv]);
    }
  }

  iterErr(errFn: (value: E) => void): void {
    if (this.isErr()) {
      return errFn(this[eee]);
    }
  }

  toOption(): Option<T> {
    if (this.isOk()) {
      return Option.some(this[vvv]);
    }

    if (this.isErr()) {
      return Option.none();
    }

    return makeNever(this.#type);
  }
}
