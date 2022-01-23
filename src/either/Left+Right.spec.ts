import { describe, expect, it, vi } from "vitest";
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
      const mappedLeft = left.mapLeft((value) => value.endsWith("a"));
      const mappedRight = left.mapRight((never) => 7);

      expect(mappedLeft).toEqual(new Left(false));
      expect(mappedRight).toEqual(left);
    });

    it("Right", () => {
      const right = new Right(42);
      const mappedLeft = right.mapLeft((never) => false);
      const mappedRight = right.mapRight((value) => value.toFixed());

      expect(mappedLeft).toEqual(right);
      expect(mappedRight).toEqual(new Right("42"));
    });
  });

  describe("map", () => {
    it("Left", () => {
      const left = new Left("foo");
      const mapped = left.map(
        (value) => value.endsWith("a"),
        (never) => 7
      );

      expect(mapped).toEqual(new Left(false));
    });

    it("Right", () => {
      const right = new Right(42);
      const mapped = right.map(
        (never) => false,
        (value) => value.toFixed()
      );

      expect(mapped).toEqual(new Right("42"));
    });
  });

  describe("fold", () => {
    it("Left", () => {
      const left = new Left("foo");
      const folded = left.fold(
        (value) => Symbol(value.substring(0)),
        (never) => Symbol()
      );

      expect(folded.description).toBe("foo");
    });

    it("Right", () => {
      const right = new Right(42);
      const folded = right.fold(
        (never) => Symbol(),
        (value) => Symbol(value.toFixed())
      );

      expect(folded.description).toBe("42");
    });
  });

  describe("iter", () => {
    it("Left", () => {
      const left = new Left("foo");
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      left.iter(
        (value) => leftMock(value),
        (never) => rightMock()
      );

      expect(leftMock).toBeCalledWith("foo");
      expect(rightMock).not.toBeCalled();
    });

    it("Right", () => {
      const right = new Right(42);
      const leftMock = vi.fn();
      const rightMock = vi.fn();
      right.iter(
        (never) => leftMock(),
        (value) => rightMock(value)
      );

      expect(leftMock).not.toBeCalled();
      expect(rightMock).toBeCalledWith(42);
    });
  });

  describe("forAll", () => {
    it("Left", () => {
      const left = new Left("foo");
      const result = left.forAll(
        (value) => value.endsWith("a"),
        (never) => true
      );

      expect(result).toBe(false);
    });

    it("Right", () => {
      const right = new Right(42);
      const result = right.forAll(
        (never) => true,
        (value) => value.toFixed() === "bar"
      );

      expect(result).toBe(false);
    });
  });
});
