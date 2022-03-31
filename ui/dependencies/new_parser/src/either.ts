interface Left<E> {
  error: E;
}

interface Right<A> {
  value: A;
}

export type Either<E, A> = Left<E> | Right<A>;

export function Left<E>(error: E): Left<E> {
  return {error};
}

export function isLeft<E, A>(either: Either<E, A>): either is Left<E> {
  return 'error' in either;
}

export function Right<A>(value: A): Right<A> {
  return {value};
}

export function isRight<E, A>(either: Either<E, A>): either is Right<A> {
  return 'value' in either;
}