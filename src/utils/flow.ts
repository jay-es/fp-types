/**
 * left-to-right composition function
 * @example flow(f, g)(x) === g(f(x))
 */
export const flow: Flow = (
  fn1: (...params: unknown[]) => unknown,
  ...fns: ((param: unknown) => unknown)[]
) => {
  return (...params: unknown[]) => fns.reduce((acc, fn) => fn(acc), fn1(...params));
};

type Flow = {
  <A extends unknown[], B>(
    fn1: (...params: A) => B, //
  ): (...params: A) => B;
  <A extends unknown[], B, C>(
    fn1: (...params: A) => B, //
    fn2: (param: B) => C,
  ): (...params: A) => C;
  <A extends unknown[], B, C, D>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
  ): (...params: A) => D;
  <A extends unknown[], B, C, D, E>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
  ): (...params: A) => E;
  <A extends unknown[], B, C, D, E, F>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
  ): (...params: A) => F;
  <A extends unknown[], B, C, D, E, F, G>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
  ): (...params: A) => G;
  <A extends unknown[], B, C, D, E, F, G, H>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
  ): (...params: A) => H;
  <A extends unknown[], B, C, D, E, F, G, H, I>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
  ): (...params: A) => I;
  <A extends unknown[], B, C, D, E, F, G, H, I, J>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
  ): (...params: A) => J;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
  ): (...params: A) => K;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
  ): (...params: A) => L;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
  ): (...params: A) => M;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
  ): (...params: A) => N;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
  ): (...params: A) => O;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
    fn15: (param: O) => P,
  ): (...params: A) => P;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
    fn15: (param: O) => P,
    fn16: (param: P) => Q,
  ): (...params: A) => Q;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
    fn15: (param: O) => P,
    fn16: (param: P) => Q,
    fn17: (param: Q) => R,
  ): (...params: A) => R;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
    fn15: (param: O) => P,
    fn16: (param: P) => Q,
    fn17: (param: Q) => R,
    fn18: (param: R) => S,
  ): (...params: A) => S;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
    fn15: (param: O) => P,
    fn16: (param: P) => Q,
    fn17: (param: Q) => R,
    fn18: (param: R) => S,
    fn19: (param: S) => T,
  ): (...params: A) => T;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
    fn1: (...params: A) => B,
    fn2: (param: B) => C,
    fn3: (param: C) => D,
    fn4: (param: D) => E,
    fn5: (param: E) => F,
    fn6: (param: F) => G,
    fn7: (param: G) => H,
    fn8: (param: H) => I,
    fn9: (param: I) => J,
    fn10: (param: J) => K,
    fn11: (param: K) => L,
    fn12: (param: L) => M,
    fn13: (param: M) => N,
    fn14: (param: N) => O,
    fn15: (param: O) => P,
    fn16: (param: P) => Q,
    fn17: (param: Q) => R,
    fn18: (param: R) => S,
    fn19: (param: S) => T,
    fn20: (param: T) => U,
  ): (...params: A) => U;
};
