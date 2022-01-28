import { describe, expect, it } from "vitest";
import { assertType, Equal } from "~~/test/assert";
import { Err, Ok, Result } from ".";
import type { Option } from "../option";

describe("Result", () => {
  describe("isOk, isErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;

      if (ok.isOk()) {
        assertType<Equal<typeof ok, Ok<string>>>();
      }

      if (ok.isErr()) {
        assertType<Equal<typeof ok, Err<number>>>();
      }
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;

      if (err.isOk()) {
        assertType<Equal<typeof err, Ok<string>>>();
      }

      if (err.isErr()) {
        assertType<Equal<typeof err, Err<number>>>();
      }
    });
  });

  describe("value", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;

      // @ts-expect-error 文字列以外はエラー
      ok.value();
      // @ts-expect-error 文字列以外はエラー
      ok.value(42);

      const value = ok.value("bar");
      assertType<Equal<typeof value, string>>();
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;

      // @ts-expect-error 文字列以外はエラー
      err.value();
      // @ts-expect-error 文字列以外はエラー
      err.value(42);

      const value = err.value("bar");
      assertType<Equal<typeof value, string>>();
    });
  });

  describe("getOk, getErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;

      const value = ok.getOk();
      assertType<Equal<typeof value, string>>();

      expect(() => {
        // 実際にはエラーになるが、number に推論される
        const error = ok.getErr();
        assertType<Equal<typeof error, number>>();
      }).toThrow();
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;

      expect(() => {
        // 実際にはエラーになるが、string に推論される
        const value = err.getOk();
        assertType<Equal<typeof value, string>>();
      }).toThrow();

      const error = err.getErr();
      assertType<Equal<typeof error, number>>();
    });
  });

  describe("equal", () => {
    it("Ok", () => {
      const ok1 = new Ok("foo") as Result<string, number>;
      const ok2 = new Ok("foo") as Result<string, number>;

      // 引数の型をテスト
      ok1.equal(
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
      const err1 = new Err(42) as Result<string, number>;
      const err2 = new Err(42) as Result<string, number>;

      // 引数の型をテスト
      err1.equal(
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

  describe("bind", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;
      const bound = ok.bind((value) => new Ok(value.endsWith("a")));

      // Ok の型が変換される
      assertType<Equal<typeof bound, Result<boolean, number>>>();
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;
      const bound = err.bind((never) => new Ok(false));

      // Ok の型が変換される
      assertType<Equal<typeof bound, Result<boolean, number>>>();
    });
  });

  describe("mapOk, mapErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;
      const mapped = ok.map((value) => value.endsWith("a"));
      const mappedErr = ok.mapErr((error) => error.toFixed(1));

      // 片方が変換された Result 型に推論される
      assertType<Equal<typeof mapped, Result<boolean, number>>>();
      assertType<Equal<typeof mappedErr, Result<string, string>>>();
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;
      const mapped = err.map((value) => value.endsWith("a"));
      const mappedErr = err.mapErr((error) => error.toFixed(1));

      // 片方が変換された Result 型に推論される
      assertType<Equal<typeof mapped, Result<boolean, number>>>();
      assertType<Equal<typeof mappedErr, Result<string, string>>>();
    });
  });

  describe("fold", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;
      const folded = ok.fold(
        (value) => Symbol(value.substring(1)),
        (error) => Symbol(error.toFixed(1)),
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;
      const folded = err.fold(
        (value) => Symbol(value.substring(1)),
        (error) => Symbol(error.toFixed(1)),
      );

      // 変換された型に推論される
      assertType<Equal<typeof folded, symbol>>();
    });
  });

  describe("iter, iterErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;

      // 引数の型をテスト
      ok.iter((value) => assertType<Equal<typeof value, string>>());
      ok.iterErr((error) => assertType<Equal<typeof error, number>>());
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;

      // 引数の型をテスト
      err.iter((value) => assertType<Equal<typeof value, string>>());
      err.iterErr((error) => assertType<Equal<typeof error, number>>());
    });
  });

  describe("toOption", () => {
    it("Ok", () => {
      const ok = new Ok("foo") as Result<string, number>;
      const option = ok.toOption();

      assertType<Equal<typeof option, Option<string>>>();
    });

    it("Err", () => {
      const err = new Err(42) as Result<string, number>;
      const option = err.toOption();

      assertType<Equal<typeof option, Option<string>>>();
    });
  });
});
