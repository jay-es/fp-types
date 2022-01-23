import { describe, expect, it } from "vitest";
import { Err, Ok } from "./Ok+Err";

describe("Ok, Err", () => {
  describe("isOk, isErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo");

      expect(ok.isOk()).toBe(true);
      expect(ok.isErr()).toBe(false);
    });

    it("Err", () => {
      const err = new Err(42);

      expect(err.isOk()).toBe(false);
      expect(err.isErr()).toBe(true);
    });
  });

  describe("value", () => {
    it("Ok", () => {
      const ok = new Ok("foo");

      expect(ok.value("bar")).toBe("foo");
    });

    it("Err", () => {
      const err = new Err(42);

      expect(err.value("bar")).toBe("bar");
    });
  });

  describe("getOk, getErr", () => {
    it("Ok", () => {
      const ok = new Ok("foo");

      expect(ok.getOk()).toBe("foo");
      expect(() => ok.getErr()).toThrow();
    });

    it("Err", () => {
      const err = new Err(42);

      expect(() => err.getOk()).toThrow();
      expect(err.getErr()).toBe(42);
    });
  });
});
