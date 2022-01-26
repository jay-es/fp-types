import { equalFn, makeNever } from "~/src/shared/helpers";
import { Option } from "./Option";

const lll = Symbol();
const rrr = Symbol();

type Left<L> = {
  [lll]: L;
  [rrr]?: undefined;
};

type Right<R> = {
  [lll]?: undefined;
  [rrr]: R;
};

type Type = "Left" | "Right";

export class Either<L, R> {
  readonly #type: Type;
  readonly [lll]?: L;
  readonly [rrr]?: R;

  private constructor(
    param: { type: "Left"; left: L } | { type: "Right"; right: R },
  ) {
    this.#type = param.type;
    if (param.type === "Left") this[lll] = param.left;
    if (param.type === "Right") this[rrr] = param.right;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static left<L, R = any>(left: L): Either<L, R> {
    return new Either({ type: "Left", left });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static right<R, L = any>(right: R): Either<L, R> {
    return new Either({ type: "Right", right });
  }

  private match<L2, R2>(
    leftFn: (left: L) => L2,
    rightFn: (right: R) => R2,
  ): L2 | R2 {
    if (this.isLeft()) return leftFn(this[lll]);
    if (this.isRight()) return rightFn(this[rrr]);
    return makeNever(this.#type);
  }

  isLeft(): this is Left<L> {
    return this.#type === "Left";
  }

  isRight(): this is Right<R> {
    return this.#type === "Right";
  }

  findLeft(): Option<L> {
    return this.match(Option.some, Option.none);
  }

  findRight(): Option<R> {
    return this.match(Option.none, Option.some);
  }

  getLeft(): L {
    if (this.isLeft()) {
      return this[lll];
    }

    throw new Error("Cannot get Right from Left");
  }

  getRight(): R {
    if (this.isRight()) {
      return this[rrr];
    }

    throw new Error("Cannot get Left from Right");
  }

  equal(
    other: Either<L, R>,
    leftFn: (l1: L, l2: L) => boolean = equalFn,
    rightFn: (r1: R, r2: R) => boolean = equalFn,
  ): boolean {
    if (this.isLeft() && other.isLeft()) {
      return leftFn(this[lll], other[lll]);
    }

    if (this.isRight() && other.isRight()) {
      return rightFn(this[rrr], other[rrr]);
    }

    return false;
  }

  mapLeft<L2>(leftFn: (left: L) => L2): Either<L2, R> {
    return this.match(
      (left) => Either.left(leftFn(left)),
      (right) => Either.right(right),
    );
  }

  mapRight<R2>(rightFn: (right: R) => R2): Either<L, R2> {
    return this.match(
      (left) => Either.left(left),
      (right) => Either.right(rightFn(right)),
    );
  }

  map<L2, R2>(
    leftFn: (left: L) => L2,
    rightFn: (right: R) => R2,
  ): Either<L2, R2> {
    return this.match(
      (left) => Either.left(leftFn(left)),
      (right) => Either.right(rightFn(right)),
    );
  }

  fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
    return this.match(leftFn, rightFn);
  }

  iter(leftFn: (left: L) => void, rightFn: (right: R) => void): void {
    this.match(leftFn, rightFn);
  }

  forAll(
    leftFn: (left: L) => boolean,
    rightFn: (right: R) => boolean,
  ): boolean {
    return this.match(leftFn, rightFn);
  }
}
