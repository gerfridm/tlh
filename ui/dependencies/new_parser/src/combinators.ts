import {isLeft, isRight, Left, Right} from './either';
import {NoTokenFound, Parser, ParseResult} from './baseParser';
import {Token} from './token';

export function alt<A>(...parsers: Parser<A>[]): Parser<A> {
  return new class extends Parser<A> {
    parse(tokens: Token[]) {
      if (tokens.length === 0) {
        return Left(NoTokenFound);
      }

      for (const parser of parsers) {
        const result = parser.parse(tokens);

        if (isRight(result)) {
          return result;
        }
      }

      // return Left('TODO!');
      throw new Error('TODO!');
    }
  };
}

function extendSequence<T extends [...any[]], S>(currentParser: Parser<T>, next: Parser<S>): Parser<[...T, S]> {
  return new class extends Parser<[...T, S]> {
    parse(tokens: Token[]): ParseResult<[...T, S]> {

      const firstResult = currentParser.parse(tokens);

      if (isLeft(firstResult)) {
        return firstResult;
      }

      const [values, remainingAfterCurrent] = firstResult.value;
      const nextResult = next.parse(remainingAfterCurrent);

      if (isLeft(nextResult)) {
        return nextResult;
      }

      const [nextValue, remainingAfterNext] = nextResult.value;

      return Right([[...values, nextValue], remainingAfterNext]);
    }
  };
}

export function sequence2<A, B>(first: Parser<A>, second: Parser<B>): Parser<[A, B]> {
  return new class extends Parser<[A, B]> {
    parse(tokens: Token[]): ParseResult<[A, B]> {
      const firstResult = first.parse(tokens);

      if (isLeft(firstResult)) {
        return firstResult;
      }

      const [firstValue, remainingAfterFirst] = firstResult.value;
      const secondResult = second.parse(remainingAfterFirst);

      if (isLeft(secondResult)) {
        return secondResult;
      }

      const [secondValue, remainingAfterSecond] = secondResult.value;

      return Right([[firstValue, secondValue], remainingAfterSecond]);
    }
  };
}

export function sequence3<A, B, C>(first: Parser<A>, second: Parser<B>, third: Parser<C>): Parser<[A, B, C]> {
  return extendSequence(sequence2(first, second), third);
}

export function sequence4<A, B, C, D>(first: Parser<A>, second: Parser<B>, third: Parser<C>, fourth: Parser<D>): Parser<[A, B, C, D]> {
  return extendSequence(sequence3(first, second, third), fourth);
}

export function sequence5<A, B, C, D, E>(first: Parser<A>, second: Parser<B>, third: Parser<C>, fourth: Parser<D>, fifth: Parser<E>): Parser<[A, B, C, D, E]> {
  return extendSequence(sequence4(first, second, third, fourth), fifth);
}