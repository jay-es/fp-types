import { describe, it } from "vitest";
import { assertType, Equal } from "~/test/assert";
import type { Option } from "../option";
import { Either, Left, Right } from "./index";

describe("Either", () => {
  describe("isLeft, isRight", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;

      if (left.isLeft()) {
        assertType<Equal<typeof left, Left<string>>>();
      }

      if (left.isRight()) {
        assertType<Equal<typeof left, Right<number>>>();
      }
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;

      if (right.isLeft()) {
        assertType<Equal<typeof right, Left<string>>>();
      }

      if (right.isRight()) {
        assertType<Equal<typeof right, Right<number>>>();
      }
    });
  });

  describe("valueLeft, valueRight", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;

      // @ts-expect-error 直接アクセス不可
      left.valueLeft();

      if (left.isLeft()) {
        const value = left.valueLeft();
        assertType<Equal<typeof value, string>>();
      }
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;

      // @ts-expect-error 直接アクセス不可
      right.valueRight();

      if (right.isRight()) {
        const value = right.valueRight();
        assertType<Equal<typeof value, number>>();
      }
    });
  });

  describe("findLeft, findRight", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;
      const optionLeft = left.findLeft();
      const optionRight = left.findRight();

      // それぞれの Option 型に推論される
      assertType<Equal<typeof optionLeft, Option<string>>>();
      assertType<Equal<typeof optionRight, Option<number>>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const optionLeft = right.findLeft();
      const optionRight = right.findRight();

      // それぞれの Option 型に推論される
      assertType<Equal<typeof optionLeft, Option<string>>>();
      assertType<Equal<typeof optionRight, Option<number>>>();
    });
  });

  describe("mapLeft, mapRight", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;
      const optionLeft = left.mapLeft((value) => value.endsWith("a"));
      const optionRight = left.mapRight((value) => value.toFixed(1));

      // 片方が変換された Either 型に推論される
      assertType<Equal<typeof optionLeft, Either<boolean, number>>>();
      assertType<Equal<typeof optionRight, Either<string, string>>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const optionLeft = right.mapLeft((value) => value.endsWith("a"));
      const optionRight = right.mapRight((value) => value.toFixed(1));

      // 片方が変換された Either 型に推論される
      assertType<Equal<typeof optionLeft, Either<boolean, number>>>();
      assertType<Equal<typeof optionRight, Either<string, string>>>();
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;
      const mapped = left.map(
        (value) => value.endsWith("a"),
        (value) => value.toFixed(1)
      );

      // 両方とも変換された Either 型に推論される
      assertType<Equal<typeof mapped, Either<boolean, string>>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const mapped = right.map(
        (value) => value.endsWith("a"),
        (value) => value.toFixed(1)
      );

      // 両方とも変換された Either 型に推論される
      assertType<Equal<typeof mapped, Either<boolean, string>>>();
    });
  });

  describe("fold", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;
      const folded = left.fold(
        (value) => Symbol(value.substring(1)),
        (value) => Symbol(value.toFixed(1))
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const folded = right.fold(
        (value) => Symbol(value.substring(1)),
        (value) => Symbol(value.toFixed(1))
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });
  });

  describe("iter", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;

      // 引数の型をテスト
      left.iter(
        (value) => assertType<Equal<typeof value, string>>(),
        (value) => assertType<Equal<typeof value, number>>()
      );
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;

      // 引数の型をテスト
      right.iter(
        (value) => assertType<Equal<typeof value, string>>(),
        (value) => assertType<Equal<typeof value, number>>()
      );
    });
  });

  describe("forAll", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;
      const result = left.forAll(
        (value) => value.endsWith("a"),
        (value) => value.toFixed() === "bar"
      );

      // boolean に推論される
      assertType<Equal<typeof result, boolean>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const result = right.forAll(
        (value) => value.endsWith("a"),
        (value) => value.toFixed() === "bar"
      );

      // boolean に推論される
      assertType<Equal<typeof result, boolean>>();
    });
  });
});
