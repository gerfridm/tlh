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
import {alt, map, Parser, ParseResult, token} from './baseParser';
import {DamageType} from '../../../src/model/wordContent/damages';


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
  map(token(LeftBracket), () => 'del_in'),
  map(token(RightBracket), () => 'del_fin'),
  map(token(TopLeftHalfBracket), () => 'laes_in'),
  map(token(TopRightHalfBracket), () => 'laes_fin'),
);

export const parseParagraphSeparator: Parser<ParagraphSeparator> = alt(
  token(SingleParagraphSeparator),
  token(DoubleParagraphSeparator)
);