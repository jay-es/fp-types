import { describe, expect, it } from "vitest";
import { assertType, Equal, NotEqual } from "~~/test/assert";
import { Either, Left, Option, Right } from ".";

describe("Either: type tests", () => {
  it("union type", () => {
    const left = Either.left("foo");
    const right = Either.right(42);
    const value = Math.random() ? left : right;

    assertType<NotEqual<typeof left, Left<string>>>();
    assertType<Equal<typeof value, Either<string, number>>>();
  });

  describe("isLeft, isRight", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");

      if (Either.isLeft(left)) {
        assertType<Equal<typeof left, Left<string>>>();
      }

      if (Either.isRight(left)) {
        assertType<Equal<typeof left, Right<number>>>();
      }
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);

      if (Either.isLeft(right)) {
        assertType<Equal<typeof right, Left<string>>>();
      }

      if (Either.isRight(right)) {
        assertType<Equal<typeof right, Right<number>>>();
      }
    });
  });

  describe("findLeft, findRight", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");
      const optionLeft = Either.findLeft(left);
      const optionRight = Either.findRight(left);

      // それぞれの Option 型に推論される
      assertType<Equal<typeof optionLeft, Option<string>>>();
      assertType<Equal<typeof optionRight, Option<number>>>();
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);
      const optionLeft = Either.findLeft(right);
      const optionRight = Either.findRight(right);

      // それぞれの Option 型に推論される
      assertType<Equal<typeof optionLeft, Option<string>>>();
      assertType<Equal<typeof optionRight, Option<number>>>();
    });
  });

  describe("getLeft, getRight", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");

      const value = Either.getLeft(left);
      assertType<Equal<typeof value, string>>();

      expect(() => {
        // 実際にはエラーになるが、number に推論される
        const error = Either.getRight(left);
        assertType<Equal<typeof error, number>>();
      }).toThrow();
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);

      expect(() => {
        // 実際にはエラーになるが、string に推論される
        const value = Either.getLeft(right);
        assertType<Equal<typeof value, string>>();
      }).toThrow();

      const value = Either.getRight(right);
      assertType<Equal<typeof value, number>>();
    });
  });

  describe("equal", () => {
    it("Left", () => {
      const left1 = Either.left<string, number>("foo");
      const left2 = Either.left<string, number>("foo");

      // 引数の型をテスト
      Either.equal(
        left1,
        left2,
        (l1, l2) => {
          assertType<Equal<typeof l1, string>>();
          assertType<Equal<typeof l2, string>>();
          return true;
        },
        (r1, r2) => {
          assertType<Equal<typeof r1, number>>();
          assertType<Equal<typeof r2, number>>();
          return true;
        },
      );
    });

    it("Right", () => {
      const right1 = Either.right<string, number>(42);
      const right2 = Either.right<string, number>(42);

      // 引数の型をテスト
      Either.equal(
        right1,
        right2,
        (l1, l2) => {
          assertType<Equal<typeof l1, string>>();
          assertType<Equal<typeof l2, string>>();
          return true;
        },
        (r1, r2) => {
          assertType<Equal<typeof r1, number>>();
          assertType<Equal<typeof r2, number>>();
          return true;
        },
      );
    });
  });

  describe("equal", () => {
    it("Left", () => {
      const left1 = Either.left<string, number>("foo");
      const left2 = Either.left<string, number>("foo");

      // 引数の型をテスト
      Either.compare(
        left1,
        left2,
        (l1, l2) => {
          assertType<Equal<typeof l1, string>>();
          assertType<Equal<typeof l2, string>>();
          return 1;
        },
        (r1, r2) => {
          assertType<Equal<typeof r1, number>>();
          assertType<Equal<typeof r2, number>>();
          return 1;
        },
      );
    });

    it("Right", () => {
      const right1 = Either.right<string, number>(42);
      const right2 = Either.right<string, number>(42);

      // 引数の型をテスト
      Either.compare(
        right1,
        right2,
        (l1, l2) => {
          assertType<Equal<typeof l1, string>>();
          assertType<Equal<typeof l2, string>>();
          return 1;
        },
        (r1, r2) => {
          assertType<Equal<typeof r1, number>>();
          assertType<Equal<typeof r2, number>>();
          return 1;
        },
      );
    });
  });

  describe("mapLeft, mapRight", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");
      const optionLeft = Either.mapLeft((value) => value.endsWith("a"), left);
      const optionRight = Either.mapRight((value) => value.toFixed(1), left);

      // 片方が変換された Either 型に推論される
      assertType<Equal<typeof optionLeft, Either<boolean, number>>>();
      assertType<Equal<typeof optionRight, Either<string, string>>>();
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);
      const optionLeft = Either.mapLeft((value) => value.endsWith("a"), right);
      const optionRight = Either.mapRight((value) => value.toFixed(1), right);

      // 片方が変換された Either 型に推論される
      assertType<Equal<typeof optionLeft, Either<boolean, number>>>();
      assertType<Equal<typeof optionRight, Either<string, string>>>();
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");
      const mapped = Either.map(
        (value) => value.endsWith("a"),
        (value) => value.toFixed(1),
        left,
      );

      // 両方とも変換された Either 型に推論される
      assertType<Equal<typeof mapped, Either<boolean, string>>>();
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);
      const mapped = Either.map(
        (value) => value.endsWith("a"),
        (value) => value.toFixed(1),
        right,
      );

      // 両方とも変換された Either 型に推論される
      assertType<Equal<typeof mapped, Either<boolean, string>>>();
    });
  });

  describe("fold", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");
      const folded = Either.fold(
        (value) => Symbol(value.substring(1)),
        (value) => Symbol(value.toFixed(1)),
        left,
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);
      const folded = Either.fold(
        (value) => Symbol(value.substring(1)),
        (value) => Symbol(value.toFixed(1)),
        right,
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });
  });

  describe("iter", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");

      // 引数の型をテスト
      Either.iter(
        (value) => assertType<Equal<typeof value, string>>(),
        (value) => assertType<Equal<typeof value, number>>(),
        left,
      );
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);

      // 引数の型をテスト
      Either.iter(
        (value) => assertType<Equal<typeof value, string>>(),
        (value) => assertType<Equal<typeof value, number>>(),
        right,
      );
    });
  });

  describe("forAll", () => {
    it("Left", () => {
      const left = Either.left<string, number>("foo");
      const result = Either.forAll(
        (value) => value.endsWith("a"),
        (value) => value.toFixed() === "bar",
        left,
      );

      // boolean に推論される
      assertType<Equal<typeof result, boolean>>();
    });

    it("Right", () => {
      const right = Either.right<string, number>(42);
      const result = Either.forAll(
        (value) => value.endsWith("a"),
        (value) => value.toFixed() === "bar",
        right,
      );

      // boolean に推論される
      assertType<Equal<typeof result, boolean>>();
    });
  });
});
