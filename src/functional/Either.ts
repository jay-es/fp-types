import { equalFn } from "~/src/shared/helpers";
import { Option } from ".";

export type Left<L> = {
  type: "Left";
  left: L;
};

export type Right<R> = {
  type: "Right";
  right: R;
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(left: L): Left<L> => ({
  type: "Left",
  left,
});

export const right = <R>(right: R): Right<R> => ({
  type: "Right",
  right,
});

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> =>
  either.type === "Left";

export const isRight = <L, R>(either: Either<L, R>): either is Right<R> =>
  either.type === "Right";

export const findLeft = <L, R>(either: Either<L, R>): Option<L> =>
  isLeft(either) ? Option.some(either.left) : Option.none();

export const findRight = <L, R>(either: Either<L, R>): Option<R> =>
  isRight(either) ? Option.some(either.right) : Option.none();

export const getLeft = <L, R>(either: Either<L, R>): L => {
  if (isLeft(either)) {
    return either.left;
  }

  throw new Error("Cannot get Right from Left");
};

export const getRight = <L, R>(either: Either<L, R>): R => {
  if (isRight(either)) {
    return either.right;
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
    return leftFn(either.left, other.left);
  }

  if (isRight(either) && isRight(other)) {
    return rightFn(either.right, other.right);
  }

  return false;
};

export const mapLeft = <L, R, L2>(
  leftFn: (left: L) => L2,
  either: Either<L, R>,
): Either<L2, R> => (isLeft(either) ? left(leftFn(either.left)) : either);

export const mapRight = <L, R, R2>(
  rightFn: (right: R) => R2,
  either: Either<L, R>,
): Either<L, R2> => (isRight(either) ? right(rightFn(either.right)) : either);

export const map = <L, R, L2, R2>(
  leftFn: (left: L) => L2,
  rightFn: (right: R) => R2,
  either: Either<L, R>,
): Either<L2, R2> =>
  isLeft(either) ? left(leftFn(either.left)) : right(rightFn(either.right));

export const fold = <L, R, T>(
  leftFn: (left: L) => T,
  rightFn: (right: R) => T,
  either: Either<L, R>,
): T => (isLeft(either) ? leftFn(either.left) : rightFn(either.right));

export const iter = <L, R>(
  leftFn: (left: L) => void,
  rightFn: (right: R) => void,
  either: Either<L, R>,
): void => (isLeft(either) ? leftFn(either.left) : rightFn(either.right));

export const forAll = <L, R>(
  leftFn: (left: L) => boolean,
  rightFn: (right: R) => boolean,
  either: Either<L, R>,
): boolean => (isLeft(either) ? leftFn(either.left) : rightFn(either.right));
