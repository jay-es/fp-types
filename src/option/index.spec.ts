import { describe, expect, it } from "vitest";
import { assertType, Equal } from "~/test/assert";
import { Option, None, Some } from "./index";

describe("Option", () => {
  describe("isSome, isNone", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;

      if (some.isSome()) {
        assertType<Equal<typeof some, Some<string>>>();
      }

      if (some.isNone()) {
        assertType<Equal<typeof some, None>>();
      }
    });

    it("None", () => {
      const none = new None() as Option<string>;

      if (none.isSome()) {
        assertType<Equal<typeof none, Some<string>>>();
      }

      if (none.isNone()) {
        assertType<Equal<typeof none, None>>();
      }
    });
  });

  describe("get", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;
      const value = some.get();

      // string に推論される
      assertType<Equal<typeof value, string>>();
    });

    it("None", () => {
      const none = new None() as Option<string>;

      expect(() => {
        // 実際にはエラーになるが、string に推論される
        const value = none.get();
        assertType<Equal<typeof value, string>>();
      }).toThrow();
    });
  });

  describe("value", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;

      // @ts-expect-error 文字列以外はエラー
      some.value();
      // @ts-expect-error 文字列以外はエラー
      some.value(42);

      const value = some.value("bar");
      assertType<Equal<typeof value, string>>();
    });

    it("None", () => {
      const none = new None() as Option<string>;

      // @ts-expect-error 文字列以外はエラー
      none.value();
      // @ts-expect-error 文字列以外はエラー
      none.value(42);

      const value = none.value("bar");
      assertType<Equal<typeof value, string>>();
    });
  });
});
