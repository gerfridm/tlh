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

// other parsers

export abstract class Parser<A> {
  abstract parse(tokens: Token[]): ParseResult<A>;

  map<B>(f: (a: A) => B): Parser<B> {
    return new MappedParser(this, f);
  }

  opt(): Parser<A | undefined> {
    return new OptionalParser(this);
  }
}

class MappedParser<A, B> extends Parser<B> {
  constructor(private child: Parser<A>, private f: (a: A) => B) {
    super();
  }

  parse(tokens: Token[]): ParseResult<B> {
    const childResult: ParseResult<A> = this.child.parse(tokens);

    return isRight(childResult)
      ? Right([this.f(childResult.value[0]), childResult.value[1]])
      : childResult;
  }
}

class OptionalParser<A> extends Parser<A | undefined> {
  constructor(private child: Parser<A>) {
    super();
  }

  parse(tokens: Token[]): ParseResult<A | undefined> {
    const childResult = this.child.parse(tokens);

    return isRight(childResult)
      ? childResult
      : Right([undefined, tokens]);
  }
}

export function token<T extends Token>(token: T): Parser<T> {
  return new class extends Parser<T> {
    parse(tokens: Token[]): ParseResult<T> {
      if (tokens.length === 0) {
        return Left(NoTokenFound);
      }

      const [head, ...tail] = tokens;

      return head === token
        ? Right([tokens[0] as T, tail])
        : Left(IllegalTokenFound(head));
    }
  };
}