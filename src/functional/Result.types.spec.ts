import { describe, expect, it } from "vitest";
import { assertType, Equal } from "~~/test/assert";
import { Err, Ok, Option, Result } from ".";

describe("Result: type tests", () => {
  describe("isOk, isErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;

      if (Result.isOk(ok)) {
        assertType<Equal<typeof ok, Ok<string>>>();
      }

      if (Result.isErr(ok)) {
        assertType<Equal<typeof ok, Err<number>>>();
      }
    });

    it("Err", () => {
      const err = Result.err(42) as Result<string, number>;

      if (Result.isOk(err)) {
        assertType<Equal<typeof err, Ok<string>>>();
      }

      if (Result.isErr(err)) {
        assertType<Equal<typeof err, Err<number>>>();
      }
    });
  });

  describe("value", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;

      // @ts-expect-error 文字列以外はエラー
      Result.value(ok);
      // @ts-expect-error 文字列以外はエラー
      Result.value(ok, 42);

      const value = Result.value(ok, "bar");
      assertType<Equal<typeof value, string>>();
    });

    it("Err", () => {
      const err = Result.err(42) as Result<string, number>;

      // @ts-expect-error 文字列以外はエラー
      Result.value(err);
      // @ts-expect-error 文字列以外はエラー
      Result.value(err, 42);

      const value = Result.value(err, "bar");
      assertType<Equal<typeof value, string>>();
    });
  });

  describe("getOk, getErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;

      const value = Result.getOk(ok);
      assertType<Equal<typeof value, string>>();

      expect(() => {
        // 実際にはエラーになるが、number に推論される
        const error = Result.getErr(ok);
        assertType<Equal<typeof error, number>>();
      }).toThrow();
    });

    it("Err", () => {
      const err = Result.err(42) as Result<string, number>;

      expect(() => {
        // 実際にはエラーになるが、string に推論される
        const value = Result.getOk(err);
        assertType<Equal<typeof value, string>>();
      }).toThrow();

      const error = Result.getErr(err);
      assertType<Equal<typeof error, number>>();
    });
  });

  describe("equal", () => {
    it("Ok", () => {
      const ok1 = Result.ok("foo") as Result<string, number>;
      const ok2 = Result.ok("foo") as Result<string, number>;

      // 引数の型をテスト
      Result.equal(
        ok1,
        ok2,
        (v1, v2) => {
          assertType<Equal<typeof v1, string>>();
          assertType<Equal<typeof v2, string>>();
          return true;
        },
        (e1, e2) => {
          assertType<Equal<typeof e1, number>>();
          assertType<Equal<typeof e2, number>>();
          return true;
        },
      );
    });

    it("Err", () => {
      const err1 = Result.err(42) as Result<string, number>;
      const err2 = Result.err(42) as Result<string, number>;

      // 引数の型をテスト
      Result.equal(
        err1,
        err2,
        (v1, v2) => {
          assertType<Equal<typeof v1, string>>();
          assertType<Equal<typeof v2, string>>();
          return true;
        },
        (e1, e2) => {
          assertType<Equal<typeof e1, number>>();
          assertType<Equal<typeof e2, number>>();
          return true;
        },
      );
    });
  });

  describe("equal", () => {
    it("Ok", () => {
      const ok1 = Result.ok("foo") as Result<string, number>;
      const ok2 = Result.ok("foo") as Result<string, number>;

      // 引数の型をテスト
      Result.compare(
        ok1,
        ok2,
        (v1, v2) => {
          assertType<Equal<typeof v1, string>>();
          assertType<Equal<typeof v2, string>>();
          return 1;
        },
        (e1, e2) => {
          assertType<Equal<typeof e1, number>>();
          assertType<Equal<typeof e2, number>>();
          return 1;
        },
      );
    });

    it("Err", () => {
      const err1 = Result.err(42) as Result<string, number>;
      const err2 = Result.err(42) as Result<string, number>;

      // 引数の型をテスト
      Result.compare(
        err1,
        err2,
        (v1, v2) => {
          assertType<Equal<typeof v1, string>>();
          assertType<Equal<typeof v2, string>>();
          return 1;
        },
        (e1, e2) => {
          assertType<Equal<typeof e1, number>>();
          assertType<Equal<typeof e2, number>>();
          return 1;
        },
      );
    });
  });

  describe("bind", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;
      const bound = Result.bind(ok, (value) => Result.ok(value.endsWith("a")));

      // Ok の型が変換される
      assertType<Equal<typeof bound, Result<boolean, number>>>();
    });

    it("Err", () => {
      const err = Result.err(42);
      const bound = Result.bind(err, (never) => Result.ok(false));

      // Ok の型が変換される
      assertType<Equal<typeof bound, Result<boolean, number>>>();
    });
  });

  describe("mapOk, mapErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;
      const mapped = Result.map((value) => value.endsWith("a"), ok);
      const mappedErr = Result.mapErr((error) => error.toFixed(1), ok);

      // 片方が変換された Result 型に推論される
      assertType<Equal<typeof mapped, Result<boolean, number>>>();
      assertType<Equal<typeof mappedErr, Result<string, string>>>();
    });

    it("Err", () => {
      const err = Result.err(42) as Result<string, number>;
      const mapped = Result.map((value) => value.endsWith("a"), err);
      const mappedErr = Result.mapErr((error) => error.toFixed(1), err);

      // 片方が変換された Result 型に推論される
      assertType<Equal<typeof mapped, Result<boolean, number>>>();
      assertType<Equal<typeof mappedErr, Result<string, string>>>();
    });
  });

  describe("fold", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;
      const folded = Result.fold(
        (value) => Symbol(value.substring(1)),
        (error) => Symbol(error.toFixed(1)),
        ok,
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });

    it("Err", () => {
      const err = Result.err(42) as Result<string, number>;
      const folded = Result.fold(
        (value) => Symbol(value.substring(1)),
        (error) => Symbol(error.toFixed(1)),
        err,
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });
  });

  describe("iter, iterErr", () => {
    it("Ok", () => {
      const ok = Result.ok("foo") as Result<string, number>;

      // 引数の型をテスト
      Result.iter((value) => assertType<Equal<typeof value, string>>(), ok);
      Result.iterErr((error) => assertType<Equal<typeof error, number>>(), ok);
    });

    it("Err", () => {
      const err = Result.err(42) as Result<string, number>;

      // 引数の型をテスト
      Result.iter((value) => assertType<Equal<typeof value, string>>(), err);
      Result.iterErr((error) => assertType<Equal<typeof error, number>>(), err);
    });
  });

  describe("toOption", () => {
    it("Ok", () => {
      const ok = Result.ok("foo");
      const option = Result.toOption(ok);

      assertType<Equal<typeof option, Option<string>>>();
    });

    it("Err", () => {
      const err = Result.err(42);
      const option = Result.toOption(err);

      // 型を指定しないと unknown になる
      assertType<Equal<typeof option, Option<unknown>>>();
    });
  });
});
