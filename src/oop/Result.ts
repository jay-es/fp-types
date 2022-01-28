import { compareFn, equalFn, makeNever } from "~/shared/helpers";
import { flow } from "~/utils";
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

export class Result<T, E> {
  readonly #type: "Ok" | "Err";
  readonly [vvv]?: T;
  readonly [eee]?: E;

  private constructor(
    options: ({ type: "Ok" } & Ok<T>) | ({ type: "Err" } & Err<E>),
  ) {
    this.#type = options.type;
    this[vvv] = options[vvv];
    this[eee] = options[eee];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ok<T, E = any>(value: T): Result<T, E> {
    return new Result({ type: "Ok", [vvv]: value });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static err<E, T = any>(error: E): Result<T, E> {
    return new Result({ type: "Err", [eee]: error });
  }

  private match<U, F>(okFn: (value: T) => U, errFn: (error: E) => F): U | F {
    if (this.isOk()) return okFn(this[vvv]);
    if (this.isErr()) return errFn(this[eee]);
    return makeNever(this.#type);
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
    errFn: (e1: E, e2: E) => boolean = equalFn,
  ): boolean {
    if (this.isOk() && other.isOk()) {
      return okFn(this[vvv], other[vvv]);
    }

    if (this.isErr() && other.isErr()) {
      return errFn(this[eee], other[eee]);
    }

    return false;
  }

  compare(
    other: Result<T, E>,
    okFn: (v1: T, v2: T) => number = compareFn,
    errFn: (e1: E, e2: E) => number = compareFn,
  ): number {
    if (this.isOk() && other.isOk()) {
      return okFn(this[vvv], other[vvv]);
    }

    if (this.isErr() && other.isErr()) {
      return errFn(this[eee], other[eee]);
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
