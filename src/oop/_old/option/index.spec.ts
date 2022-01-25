import { describe, expect, it } from "vitest";
import { assertType, Equal } from "~/test/assert";
import type { Result } from "../result";
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

  describe("equal", () => {
    it("Some", () => {
      const some1 = new Some("foo") as Option<string>;
      const some2 = new Some("foo") as Option<string>;
      const none = new None() as Option<string>;

      // 引数の型をテスト
      some1.equal(some2, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });

      some1.equal(none, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });
    });

    it("None", () => {
      const none1 = new None() as Option<string>;
      const none2 = new None() as Option<string>;
      const some = new Some("foo") as Option<string>;

      // 引数の型をテスト
      none1.equal(none2, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });

      none1.equal(some, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });
    });
  });

  describe("bind", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;
      const bound = some.bind((value) => new Some(value.endsWith("a")));

      // 変換された Option 型に推論される
      assertType<Equal<typeof bound, Option<boolean>>>();
    });

    it("None", () => {
      const none = new None() as Option<string>;
      const bound = none.bind((value) => new Some(7));

      // 変換された Option 型に推論される
      assertType<Equal<typeof bound, Option<number>>>();
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;
      const mapped = some.map((value) => value.endsWith("a"));

      // 変換された Option 型に推論される
      assertType<Equal<typeof mapped, Option<boolean>>>();
    });

    it("None", () => {
      const none = new None() as Option<string>;
      const mapped = none.map((value) => 7);

      // 変換された Option 型に推論される
      assertType<Equal<typeof mapped, Option<number>>>();
    });
  });

  describe("fold", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;
      const folded = some.fold(true, (value) => value.endsWith("a"));

      // 変換された Option 型に推論される
      assertType<Equal<typeof folded, boolean>>();
    });

    it("None", () => {
      const none = new None() as Option<string>;
      const folded = none.fold(true, (value) => value.endsWith("a"));

      // 変換された Option 型に推論される
      assertType<Equal<typeof folded, boolean>>();
    });
  });

  describe("iter", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;

      // 引数の型をテスト
      some.iter((value) => assertType<Equal<typeof value, string>>());
    });

    it("None", () => {
      const none = new None() as Option<string>;

      // 引数の型をテスト
      none.iter((value) => assertType<Equal<typeof value, string>>());
    });
  });

  describe("toResult", () => {
    it("Some", () => {
      const some = new Some("foo") as Option<string>;
      const result = some.toResult(42);

      assertType<Equal<typeof result, Result<string, number>>>();
    });

    it("None", () => {
      const none = new None() as Option<string>;
      const result = none.toResult(42);

      assertType<Equal<typeof result, Result<string, number>>>();
    });
  });
});
