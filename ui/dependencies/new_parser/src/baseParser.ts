import {Token} from './token';
import {Either, isRight, Left, Right} from './either';

// types

export const NoTokenFound = {_type: 'NoTokenFound'};

export interface IllegalTokenFound {
  _type: 'IllegalTokenFound';
  found: Token;
}

export function IllegalTokenFound(found: Token): IllegalTokenFound {
  return {_type: 'IllegalTokenFound', found};
}

export type ParseError = typeof NoTokenFound | IllegalTokenFound;

export type ParseResult<T> = Either<ParseError, [T, Token[]]>

export type Parser<A> = (tokens: Token[]) => ParseResult<A>;

// Parser combinators

export function map<A, B>(parser: Parser<A>, f: (a: A) => B): Parser<B> {
  return (tokens) => {
    const result = parser(tokens);

    return (isRight(result))
      ? Right([f(result.value[0]), result.value[1]])
      : result;
  };
}

export function alt<A>(...parsers: Parser<A>[]): Parser<A> {
  return (tokens) => {
    if (tokens.length === 0) {
      return Left(NoTokenFound);
    }

    for (const parser of parsers) {
      const result = parser(tokens);

      if (isRight(result)) {
        return result;
      }
    }

    // return Left('TODO!');
    throw new Error('TODO!');
  };
}

// other parsers

export function token<T extends Token>(token: T): Parser<T> {
  return (tokens) => {
    if (tokens.length === 0) {
      return Left(NoTokenFound);
    }

    const [head, ...tail] = tokens;

    return head === token
      ? Right([tokens[0] as T, tail])
      : Left(IllegalTokenFound(head));
  };
}