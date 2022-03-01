import {lex} from './lexer';
import {
  Asterisk,
  Degree,
  DoubleParagraphSeparator, Ellipsis,
  Equal,
  ExclamationMark,
  LeftBrace,
  LeftBracket,
  LeftParenthesis,
  Minus,
  Negation,
  QuestionMark,
  RightBrace,
  RightBracket,
  RightParenthesis,
  SingleParagraphSeparator,
  TopLeftHalfBracket,
  TopRightHalfBracket,
  Underscore
} from './token';

describe('lexer', () => {
  it('should lex clamps', () => {
    expect(lex('()[]{}⸢⸣')).toEqual([LeftParenthesis, RightParenthesis, LeftBracket, RightBracket, LeftBrace, RightBrace, TopLeftHalfBracket, TopRightHalfBracket]);
  });

  it('should lex punctuation marks', () => {
    expect(lex('!?-_*°=¬')).toEqual([ExclamationMark, QuestionMark, Minus, Underscore, Asterisk, Degree, Equal, Negation]);
  });

  it('should parse paragraph separators', () => {
    expect(lex('§')).toEqual([SingleParagraphSeparator]);
    expect(lex('§ ')).toEqual([SingleParagraphSeparator]);
    expect(lex('¬¬¬')).toEqual([SingleParagraphSeparator]);
    expect(lex('¬¬¬ ')).toEqual([SingleParagraphSeparator]);
    expect(lex('§§')).toEqual([DoubleParagraphSeparator]);
    expect(lex('§§ ')).toEqual([DoubleParagraphSeparator]);
    expect(lex('===')).toEqual([DoubleParagraphSeparator]);
    expect(lex('=== ')).toEqual([DoubleParagraphSeparator]);
  });

  it('should parse an ellipsis', () => {
    expect(lex('…')).toEqual([Ellipsis]);
    expect(lex('...')).toEqual([Ellipsis]);
  });
});