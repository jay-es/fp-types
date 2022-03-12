import { compareFn, equalFn, throwError } from "~/shared/helpers";
import { flow } from "~/utils";
import { Option } from "./Option";

const _value = Symbol();
const _error = Symbol();

type Ok<T> = {
  [_value]: T;
  [_error]?: undefined;
};

type Err<E> = {
  [_value]?: undefined;
  [_error]: E;
};

export class Result<T, E> {
  readonly #type: "Ok" | "Err";
  readonly [_value]?: T;
  readonly [_error]?: E;

  private constructor(
    options: ({ type: "Ok" } & Ok<T>) | ({ type: "Err" } & Err<E>),
  ) {
    this.#type = options.type;
    this[_value] = options[_value];
    this[_error] = options[_error];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ok<T = any, E = any>(value: T): Result<T, E> {
    return new Result({ type: "Ok", [_value]: value });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static err<T = any, E = any>(error: E): Result<T, E> {
    return new Result({ type: "Err", [_error]: error });
  }

  private match<U, F>(okFn: (value: T) => U, errFn: (error: E) => F): U | F {
    if (this.isOk()) return okFn(this[_value]);
    if (this.isErr()) return errFn(this[_error]);
    return throwError(this.#type);
  }

  isOk(): this is Ok<T> {
    return this.#type === "Ok";
  }

  isErr(): this is Err<E> {
    return this.#type === "Err";
  }

  value(defaultValue: T): T {
    return this.isOk() ? this[_value] : defaultValue;
  }

  getOk(): T {
    if (this.isOk()) {
      return this[_value];
    }

    throw new Error("Cannot get Ok from Err");
  }

  getErr(): E {
    if (this.isErr()) {
      return this[_error];
    }

    throw new Error("Cannot get Err from Ok");
  }

  equal(
    other: Result<T, E>,
    okFn: (v1: T, v2: T) => boolean = equalFn,
    errFn: (e1: E, e2: E) => boolean = equalFn,
  ): boolean {
    if (this.isOk() && other.isOk()) {
      return okFn(this[_value], other[_value]);
    }

    if (this.isErr() && other.isErr()) {
      return errFn(this[_error], other[_error]);
    }

    return false;
  }

  compare(
    other: Result<T, E>,
    okFn: (v1: T, v2: T) => number = compareFn,
    errFn: (e1: E, e2: E) => number = compareFn,
  ): number {
    if (this.isOk() && other.isOk()) {
      return okFn(this[_value], other[_value]);
    }

    if (this.isErr() && other.isErr()) {
      return errFn(this[_error], other[_error]);
    }

    return this.isOk() ? -1 : 1;
  }

  bind<U>(okFn: (value: T) => Result<U, E>): Result<U, E> {
    return this.match(okFn, Result.err);
  }

  map<U>(okFn: (value: T) => U): Result<U, E> {
    return this.match(flow(okFn, Result.ok), Result.err);
  }

  mapErr<F>(errFn: (error: E) => F): Result<T, F> {
    return this.match(Result.ok, flow(errFn, Result.err));
  }

  fold<U>(okFn: (value: T) => U, errFn: (error: E) => U): U {
    return this.match(okFn, errFn);
  }

  iter(okFn: (value: T) => void): void {
    this.match(okFn, () => undefined);
  }

  iterErr(errFn: (value: E) => void): void {
    this.match(() => undefined, errFn);
  }

  toOption(): Option<T> {
    return this.match(Option.some, Option.none);
  }
}
