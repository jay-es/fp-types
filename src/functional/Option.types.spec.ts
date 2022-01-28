import { describe, expect, it } from "vitest";
import { assertType, Equal } from "~~/test/assert";
import { None, Option, Result, Some } from "./";

describe("Option: type tests", () => {
  it("union type", () => {
    const value = Math.random() ? Option.some("foo") : Option.none();
    assertType<Equal<typeof value, Option<string>>>();
  });

  describe("isSome, isNone", () => {
    it("Some", () => {
      const some = Option.some("foo");

      if (Option.isSome(some)) {
        assertType<Equal<typeof some, Some<string>>>();
      }

      if (Option.isNone(some)) {
        assertType<Equal<typeof some, None>>();
      }
    });

    it("None", () => {
      const none = Option.none();

      if (Option.isSome(none)) {
        assertType<Equal<typeof none, Some<never>>>();
      }

      if (Option.isNone(none)) {
        assertType<Equal<typeof none, None>>();
      }
    });
  });

  describe("value", () => {
    it("Some", () => {
      const some = Option.some("foo");

      // @ts-expect-error 文字列以外はエラー
      Option.value(some, 42);

      const value = Option.value(some, "bar");
      assertType<Equal<typeof value, string>>();
    });

    it("None", () => {
      const none = Option.none() as Option<string>;

      // @ts-expect-error 文字列以外はエラー
      Option.value(none, 42);

      const value = Option.value(none, "bar");
      assertType<Equal<typeof value, string>>();
    });
  });

  describe("get", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const value = Option.get(some);

      // string に推論される
      assertType<Equal<typeof value, string>>();
    });

    it("None", () => {
      const none = Option.none() as Option<string>;

      expect(() => {
        // 実際にはエラーになるが、string に推論される
        const value = Option.get(none);
        assertType<Equal<typeof value, string>>();
      }).toThrow();
    });
  });

  describe("equal", () => {
    it("Some", () => {
      const some1 = Option.some("foo");
      const some2 = Option.some("foo");
      const none = Option.none();

      // 引数の型をテスト
      Option.equal(some1, some2, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });

      Option.equal(some1, none, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });
    });

    it("None", () => {
      const none1 = Option.none();
      const none2 = Option.none() as Option<string>;
      const some = Option.some("foo");

      // 引数の型をテスト
      Option.equal(none1, none2, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });

      Option.equal(none1, some, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return true;
      });
    });
  });

  describe("compare", () => {
    it("Some", () => {
      const some1 = Option.some("foo");
      const some2 = Option.some("foo");
      const none = Option.none();

      // 引数の型をテスト
      Option.compare(some1, some2, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return 1;
      });

      Option.compare(some1, none, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return 1;
      });
    });

    it("None", () => {
      const none1 = Option.none();
      const none2 = Option.none() as Option<string>;
      const some = Option.some("foo");

      // 引数の型をテスト
      Option.compare(none1, none2, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return 1;
      });

      Option.compare(none1, some, (v1, v2) => {
        assertType<Equal<typeof v1, string>>();
        assertType<Equal<typeof v2, string>>();
        return 1;
      });
    });
  });

  describe("bind", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const bound = Option.bind(some, (value) =>
        Option.some(value.endsWith("a")),
      );

      // 変換された Option 型に推論される
      assertType<Equal<typeof bound, Option<boolean>>>();
    });

    it("None", () => {
      const none = Option.none();
      const bound = Option.bind(none, (value) => Option.some(7));

      // 変換された Option 型に推論される
      assertType<Equal<typeof bound, Option<number>>>();
    });
  });

  describe("map", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const mapped = Option.map((value) => value.endsWith("a"), some);

      // 変換された Option 型に推論される
      assertType<Equal<typeof mapped, Option<boolean>>>();
    });

    it("None", () => {
      const none = Option.none();
      const mapped = Option.map((value) => 7, none);

      // 変換された Option 型に推論される
      assertType<Equal<typeof mapped, Option<number>>>();
    });
  });

  describe("fold", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const folded = Option.fold(true, (value) => value.endsWith("a"), some);

      // 変換された Option 型に推論される
      assertType<Equal<typeof folded, boolean>>();
    });

    it("None", () => {
      const none = Option.none() as Option<string>;
      const folded = Option.fold(true, (value) => value.endsWith("a"), none);

      // 変換された Option 型に推論される
      assertType<Equal<typeof folded, boolean>>();
    });
  });

  describe("iter", () => {
    it("Some", () => {
      const some = Option.some("foo");

      // 引数の型をテスト
      Option.iter((value) => assertType<Equal<typeof value, string>>(), some);
    });

    it("None", () => {
      const none = Option.none() as Option<string>;

      // 引数の型をテスト
      Option.iter((value) => assertType<Equal<typeof value, string>>(), none);
    });
  });

  describe("toResult", () => {
    it("Some", () => {
      const some = Option.some("foo");
      const result = Option.toResult(42, some);

      assertType<Equal<typeof result, Result<string, number>>>();
    });

    it("None", () => {
      const none = Option.none();
      const result = Option.toResult(42, none);

      // 型を指定しないと unknown になる
      assertType<Equal<typeof result, Result<never, number>>>();
    });
  });
});
