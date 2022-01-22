import { describe, expect, it } from "vitest";
import { Left, Right } from "./Left+Right";
import { None, Some } from "../option";

describe("Left, Right", () => {
  describe("isLeft, isRight", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.isLeft()).toBe(true);
      expect(left.isRight()).toBe(false);
    });

    it("Right", () => {
      const right = new Right(42);

      expect(right.isLeft()).toBe(false);
      expect(right.isRight()).toBe(true);
    });
  });

  describe("value", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.valueLeft()).toBe("foo");
    });

    it("Right", () => {
      const right = new Right(42);

      expect(right.valueRight()).toBe(42);
    });
  });

  describe("findLeft, findRight", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.findLeft()).toEqual(new Some("foo"));
      expect(left.findRight()).toEqual(new None());
    });

    it("Right", () => {
      const right = new Right(42);

      expect(right.findLeft()).toEqual(new None());
      expect(right.findRight()).toEqual(new Some(42));
    });
  });

  describe("mapLeft, mapRight", () => {
    it("Left", () => {
      const left = new Left("foo");

      expect(left.mapLeft((v) => v.endsWith("a"))).toEqual(new Left(false));
      expect(left.mapRight((never) => 7)).toEqual(left);
    });

    it("Right", () => {
      const right = new Right(42);

      expect(right.mapLeft((never) => false)).toEqual(right);
      expect(right.mapRight((v) => v.toFixed())).toEqual(new Right("42"));
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = new Left("foo");
      const mapped = left.map(
        (v) => v.endsWith("a"),
        (never) => 7
      );

      expect(mapped).toEqual(new Left(false));
    });

    it("Right", () => {
      const right = new Right(42);
      const mapped = right.map(
        (never) => false,
        (v) => v.toFixed()
      );

      expect(mapped).toEqual(new Right("42"));
    });
  });
});
