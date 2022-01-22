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
      const optionLeft = left.mapLeft((v) => v.endsWith("a"));
      const optionRight = left.mapRight((v) => v.toFixed());

      // 片方が変換された Either 型に推論される
      assertType<Equal<typeof optionLeft, Either<boolean, number>>>();
      assertType<Equal<typeof optionRight, Either<string, string>>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const optionLeft = right.mapLeft((v) => v.endsWith("a"));
      const optionRight = right.mapRight((v) => v.toFixed());

      // 片方が変換された Either 型に推論される
      assertType<Equal<typeof optionLeft, Either<boolean, number>>>();
      assertType<Equal<typeof optionRight, Either<string, string>>>();
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = new Left("foo") as Either<string, number>;
      const mapped = left.map(
        (v) => v.endsWith("a"),
        (v) => v.toFixed()
      );

      // 両方とも変換された Either 型に推論される
      assertType<Equal<typeof mapped, Either<boolean, string>>>();
    });

    it("Right", () => {
      const right = new Right(42) as Either<string, number>;
      const mapped = right.map(
        (v) => v.endsWith("a"),
        (v) => v.toFixed()
      );

      // 両方とも変換された Either 型に推論される
      assertType<Equal<typeof mapped, Either<boolean, string>>>();
    });
  });
});
