import { None, Option, Some } from "../option";

interface IEither {
  isLeft(): boolean;
  isRight(): boolean;
  findLeft(): Option<unknown>;
  findRight(): Option<unknown>;
  mapLeft<T>(fn: (left: unknown) => T): IEither;
  mapRight<U>(fn: (right: unknown) => U): IEither;
  map<T, U>(
    fnLeft: (left: unknown) => T,
    fnRight: (right: unknown) => U
  ): IEither;
}

export class Left<L> implements IEither {
  readonly #value: L;

  constructor(value: L) {
    this.#value = value;
  }

  // Left のみのメソッド
  valueLeft(): L {
    return this.#value;
  }

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): false {
    return false;
  }

  findLeft(): Some<L> {
    return new Some(this.#value);
  }

  findRight(): None {
    return new None();
  }

  mapLeft<T>(fn: (left: L) => T): Left<T> {
    return new Left(fn(this.#value));
  }

  mapRight<U>(fn: (right: never) => U): Left<L> {
    return new Left(this.#value);
  }

  map<T, U>(leftFn: (left: L) => T, rightFn: (right: never) => U): Left<T> {
    return this.mapLeft(leftFn);
  }
}

export class Right<R> implements IEither {
  readonly #value: R;

  constructor(value: R) {
    this.#value = value;
  }

  // Right のみのメソッド
  valueRight(): R {
    return this.#value;
  }

  isLeft(): false {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }

  findLeft(): None {
    return new None();
  }

  findRight(): Some<R> {
    return new Some(this.#value);
  }

  mapLeft<T>(fn: (left: never) => T): Right<R> {
    return new Right(this.#value);
  }

  mapRight<U>(fn: (right: R) => U): Right<U> {
    return new Right(fn(this.#value));
  }

  map<T, U>(leftFn: (left: never) => T, rightFn: (right: R) => U): Right<U> {
    return this.mapRight(rightFn);
  }
}
