/**
 * @example compose(f, g)(x) === f(g(x))
 */
export const compose: Compose = (...fns: ((param: unknown) => unknown)[]) => {
  const fn1 = fns.pop() as (...params: unknown[]) => unknown;

  return (...params: unknown[]) => fns.reduceRight((acc, fn) => fn(acc), fn1(...params));
};

type Compose = {
  <A extends unknown[], B>(
    fn1: (...params: A) => B, //
  ): (...params: A) => B;
  <A extends unknown[], B, C>(
    fn2: (param: B) => C, //
    fn1: (...params: A) => B,
  ): (...params: A) => C;
  <A extends unknown[], B, C, D>(
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => D;
  <A extends unknown[], B, C, D, E>(
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => E;
  <A extends unknown[], B, C, D, E, F>(
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => F;
  <A extends unknown[], B, C, D, E, F, G>(
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => G;
  <A extends unknown[], B, C, D, E, F, G, H>(
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => H;
  <A extends unknown[], B, C, D, E, F, G, H, I>(
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => I;
  <A extends unknown[], B, C, D, E, F, G, H, I, J>(
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => J;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K>(
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => K;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L>(
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => L;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M>(
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => M;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N>(
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => N;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => O;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    fn15: (param: O) => P,
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => P;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    fn16: (param: P) => Q,
    fn15: (param: O) => P,
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => Q;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    fn17: (param: Q) => R,
    fn16: (param: P) => Q,
    fn15: (param: O) => P,
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => R;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    fn18: (param: R) => S,
    fn17: (param: Q) => R,
    fn16: (param: P) => Q,
    fn15: (param: O) => P,
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => S;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    fn19: (param: S) => T,
    fn18: (param: R) => S,
    fn17: (param: Q) => R,
    fn16: (param: P) => Q,
    fn15: (param: O) => P,
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => T;
  <A extends unknown[], B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
    fn20: (param: T) => U,
    fn19: (param: S) => T,
    fn18: (param: R) => S,
    fn17: (param: Q) => R,
    fn16: (param: P) => Q,
    fn15: (param: O) => P,
    fn14: (param: N) => O,
    fn13: (param: M) => N,
    fn12: (param: L) => M,
    fn11: (param: K) => L,
    fn10: (param: J) => K,
    fn9: (param: I) => J,
    fn8: (param: H) => I,
    fn7: (param: G) => H,
    fn6: (param: F) => G,
    fn5: (param: E) => F,
    fn4: (param: D) => E,
    fn3: (param: C) => D,
    fn2: (param: B) => C,
    fn1: (...params: A) => B,
  ): (...params: A) => U;
};
