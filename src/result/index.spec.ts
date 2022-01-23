import { describe, expect, it } from "vitest";
import { assertType, Equal } from "~/test/assert";
import { Err, Ok, Result } from ".";

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
});
