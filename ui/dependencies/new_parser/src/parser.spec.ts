import {parseDamage, parseParagraphSeparator} from './parser';
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
import {IllegalTokenFound, NoTokenFound, ParseResult} from './baseParser';
import {Left, Right} from './either';
import {DamageType} from '../../../src/model/wordContent/damages';

describe('parseDamage', () => {
  test.each<{ toParse: Token[], expected: ParseResult<DamageType> }>([
    {toParse: [LeftBracket], expected: Right(['del_in', []])},
    {toParse: [RightBracket], expected: Right(['del_fin', []])},
    {toParse: [TopLeftHalfBracket], expected: Right(['laes_in', []])},
    {toParse: [TopRightHalfBracket], expected: Right(['laes_fin', []])},
  ])(
    'it should parse $toParse as $expected',
    ({toParse, expected}) => expect(parseDamage.parse(toParse)).toEqual(expected)
  );
});

describe('parseParagraphSeparator', () => {
  test.each<{ toParse: Token[], expected: ParseResult<ParagraphSeparator> }>([
    {toParse: [], expected: Left(NoTokenFound)},
    {toParse: [LeftBracket], expected: Left(IllegalTokenFound(LeftBracket))},
    {toParse: [SingleParagraphSeparator], expected: Right([SingleParagraphSeparator, []])},
    {toParse: [DoubleParagraphSeparator], expected: Right([DoubleParagraphSeparator, []])},
  ])(
    'it should parse $toParse as $expected',
    ({toParse, expected}) => expect(parseParagraphSeparator.parse(toParse)).toEqual(expected)
  );
});