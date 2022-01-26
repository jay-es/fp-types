/**
 * left-to-right composition function
 * @example flow(f, g)(x) === g(f(x))
 */
export const flow: Flow = (
  fn1: (...args: unknown[]) => unknown,
  ...fns: ((arg: unknown) => unknown)[]
) => {
  return (...args: unknown[]) => fns.reduce((acc, fn) => fn(acc), fn1(...args));
};

type Flow = {
  <A extends unknown[], B>(
    fn1: (...args: A) => B, //
  ): (...args: A) => B;
  <A extends unknown[], B, C>(
    fn1: (...args: A) => B, //
    fn2: (arg: B) => C,
  ): (...args: A) => C;
  <A extends unknown[], B, C, D>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
  ): (...args: A) => D;
  <A extends unknown[], B, C, D, E>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
  ): (...args: A) => E;
  <A extends unknown[], B, C, D, E, F>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
  ): (...args: A) => F;
  <A extends unknown[], B, C, D, E, F, G>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
  ): (...args: A) => G;
  <A extends unknown[], B, C, D, E, F, G, H>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
  ): (...args: A) => H;
  <A extends unknown[], B, C, D, E, F, G, H, I>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
  ): (...args: A) => I;
  <A extends unknown[], B, C, D, E, F, G, H, I, J>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
  ): (...args: A) => J;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
  ): (...args: A) => K;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
  ): (...args: A) => L;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
  ): (...args: A) => M;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
  ): (...args: A) => N;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
  ): (...args: A) => O;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
    fn15: (arg: O) => P,
  ): (...args: A) => P;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
    fn15: (arg: O) => P,
    fn16: (arg: P) => Q,
  ): (...args: A) => Q;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
    fn15: (arg: O) => P,
    fn16: (arg: P) => Q,
    fn17: (arg: Q) => R,
  ): (...args: A) => R;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
    fn15: (arg: O) => P,
    fn16: (arg: P) => Q,
    fn17: (arg: Q) => R,
    fn18: (arg: R) => S,
  ): (...args: A) => S;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
    fn15: (arg: O) => P,
    fn16: (arg: P) => Q,
    fn17: (arg: Q) => R,
    fn18: (arg: R) => S,
    fn19: (arg: S) => T,
  ): (...args: A) => T;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    fn9: (arg: I) => J,
    fn10: (arg: J) => K,
    fn11: (arg: K) => L,
    fn12: (arg: L) => M,
    fn13: (arg: M) => N,
    fn14: (arg: N) => O,
    fn15: (arg: O) => P,
    fn16: (arg: P) => Q,
    fn17: (arg: Q) => R,
    fn18: (arg: R) => S,
    fn19: (arg: S) => T,
    fn20: (arg: T) => U,
  ): (...args: A) => U;
};
