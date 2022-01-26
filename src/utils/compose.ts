/**
 * right-to-left composition function
 * @example compose(f, g)(x) === f(g(x))
 */
export const compose: Compose = (...fns: ((arg: unknown) => unknown)[]) => {
  const fn1 = fns.pop() as (...args: unknown[]) => unknown;

  return (...args: unknown[]) => fns.reduceRight((acc, fn) => fn(acc), fn1(...args));
};

type Compose = {
  <A extends unknown[], B>(
    fn1: (...args: A) => B, //
  ): (...args: A) => B;
  <A extends unknown[], B, C>(
    fn2: (arg: B) => C, //
    fn1: (...args: A) => B,
  ): (...args: A) => C;
  <A extends unknown[], B, C, D>(
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => D;
  <A extends unknown[], B, C, D, E>(
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => E;
  <A extends unknown[], B, C, D, E, F>(
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => F;
  <A extends unknown[], B, C, D, E, F, G>(
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => G;
  <A extends unknown[], B, C, D, E, F, G, H>(
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => H;
  <A extends unknown[], B, C, D, E, F, G, H, I>(
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => I;
  <A extends unknown[], B, C, D, E, F, G, H, I, J>(
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => J;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K>(
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => K;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L>(
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => L;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M>(
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => M;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N>(
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => N;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => O;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    fn15: (arg: O) => P,
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => P;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    fn16: (arg: P) => Q,
    fn15: (arg: O) => P,
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => Q;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    fn17: (arg: Q) => R,
    fn16: (arg: P) => Q,
    fn15: (arg: O) => P,
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => R;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    fn18: (arg: R) => S,
    fn17: (arg: Q) => R,
    fn16: (arg: P) => Q,
    fn15: (arg: O) => P,
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => S;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    fn19: (arg: S) => T,
    fn18: (arg: R) => S,
    fn17: (arg: Q) => R,
    fn16: (arg: P) => Q,
    fn15: (arg: O) => P,
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => T;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
    fn20: (arg: T) => U,
    fn19: (arg: S) => T,
    fn18: (arg: R) => S,
    fn17: (arg: Q) => R,
    fn16: (arg: P) => Q,
    fn15: (arg: O) => P,
    fn14: (arg: N) => O,
    fn13: (arg: M) => N,
    fn12: (arg: L) => M,
    fn11: (arg: K) => L,
    fn10: (arg: J) => K,
    fn9: (arg: I) => J,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B,
  ): (...args: A) => U;
};
