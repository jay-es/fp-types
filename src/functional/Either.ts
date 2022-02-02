import { compareFn, equalFn } from "~/shared/helpers";
import { Option } from ".";

const _type = Symbol();
const _left = Symbol();
const _right = Symbol();

export type Left<L> = {
  [_type]: "Left";
  [_left]: L;
};

export type Right<R> = {
  [_type]: "Right";
  [_right]: R;
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L = never, R = never>(left: L): Either<L, R> => ({
  [_type]: "Left",
  [_left]: left,
});

export const right = <L = never, R = never>(right: R): Either<L, R> => ({
  [_type]: "Right",
  [_right]: right,
});

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> =>
  either[_type] === "Left";

export const isRight = <L, R>(either: Either<L, R>): either is Right<R> =>
  either[_type] === "Right";

export const findLeft = <L, R>(either: Either<L, R>): Option<L> =>
  isLeft(either) ? Option.some(either[_left]) : Option.none();

export const findRight = <L, R>(either: Either<L, R>): Option<R> =>
  isRight(either) ? Option.some(either[_right]) : Option.none();

export const getLeft = <L, R>(either: Either<L, R>): L => {
  if (isLeft(either)) {
    return either[_left];
  }

  throw new Error("Cannot get Right from Left");
};

export const getRight = <L, R>(either: Either<L, R>): R => {
  if (isRight(either)) {
    return either[_right];
  }

  throw new Error("Cannot get Left from Right");
};

export const equal = <L, R>(
  either: Either<L, R>,
  other: Either<L, R>,
  leftFn: (l1: L, l2: L) => boolean = equalFn,
  rightFn: (r1: R, r2: R) => boolean = equalFn,
): boolean => {
  if (isLeft(either) && isLeft(other)) {
    return leftFn(either[_left], other[_left]);
  }

  if (isRight(either) && isRight(other)) {
    return rightFn(either[_right], other[_right]);
  }

  return false;
};

export const compare = <L, R>(
  either: Either<L, R>,
  other: Either<L, R>,
  leftFn: (l1: L, l2: L) => number = compareFn,
  rightFn: (r1: R, r2: R) => number = compareFn,
): number => {
  if (isLeft(either) && isLeft(other)) {
    return leftFn(either[_left], other[_left]);
  }

  if (isRight(either) && isRight(other)) {
    return rightFn(either[_right], other[_right]);
  }

  return isLeft(either) ? -1 : 1;
};

export const mapLeft = <L, R, L2>(
  leftFn: (left: L) => L2,
  either: Either<L, R>,
): Either<L2, R> => (isLeft(either) ? left(leftFn(either[_left])) : either);

export const mapRight = <L, R, R2>(
  rightFn: (right: R) => R2,
  either: Either<L, R>,
): Either<L, R2> => (isRight(either) ? right(rightFn(either[_right])) : either);

export const map = <L, R, L2, R2>(
  leftFn: (left: L) => L2,
  rightFn: (right: R) => R2,
  either: Either<L, R>,
): Either<L2, R2> =>
  isLeft(either) ? left(leftFn(either[_left])) : right(rightFn(either[_right]));

export const fold = <L, R, T>(
  leftFn: (left: L) => T,
  rightFn: (right: R) => T,
  either: Either<L, R>,
): T => (isLeft(either) ? leftFn(either[_left]) : rightFn(either[_right]));

export const iter = <L, R>(
  leftFn: (left: L) => void,
  rightFn: (right: R) => void,
  either: Either<L, R>,
): void => (isLeft(either) ? leftFn(either[_left]) : rightFn(either[_right]));

export const forAll = <L, R>(
  leftFn: (left: L) => boolean,
  rightFn: (right: R) => boolean,
  either: Either<L, R>,
): boolean =>
  isLeft(either) ? leftFn(either[_left]) : rightFn(either[_right]);
