import {
  DoubleParagraphSeparator,
  LeftBracket,
  ParagraphSeparator,
  RightBracket,
  SingleParagraphSeparator,
  Token,
  TopLeftHalfBracket,
  TopRightHalfBracket
} from './token';
import {Parser, ParseResult, token} from './baseParser';
import {DamageType} from '../../../src/model/wordContent/damages';
import {alt} from './combinators';


export function parse(tokens: Token[]): ParseResult<any> {
  throw new Error('TODO!');
}

function parseLine(tokens: Token[]): ParseResult<any> {
  throw new Error('TODO!');
}

function parseWord(tokens: Token[]): ParseResult<any> {
  throw new Error('TODO!');
}

export const parseDamage: Parser<DamageType> = alt(
  token(LeftBracket).map(() => 'del_in'),
  token(RightBracket).map(() => 'del_fin'),
  token(TopLeftHalfBracket).map(() => 'laes_in'),
  token(TopRightHalfBracket).map(() => 'laes_fin'),
);

export const parseParagraphSeparator: Parser<ParagraphSeparator> = alt(
  token(SingleParagraphSeparator),
  token(DoubleParagraphSeparator)
);