// Parentheses, Brackets, Braces, ...
export const LeftParenthesis = '(';
export const RightParenthesis = ')';

export const LeftBracket = '[';
export const RightBracket = ']';

export const LeftBrace = '{';
export const RightBrace = '}';

export const TopLeftHalfBracket = '⸢';
export const TopRightHalfBracket = '⸣';

export type Clamps = typeof LeftParenthesis
  | typeof RightParenthesis
  | typeof LeftBracket
  | typeof RightBracket
  | typeof LeftBrace
  | typeof RightBrace
  | typeof TopLeftHalfBracket
  | typeof TopRightHalfBracket;

// Punctuation marks

export const ExclamationMark = '!';
export const QuestionMark = '?';
export const Minus = '-';
export const Underscore = '_';
export const Asterisk = '*';
export const Degree = '°';
export const Equal = '=';
export const Negation = '¬';
export const Dot = '.';
export const Ellipsis = '…';

export type PunctuationMarks =
  typeof ExclamationMark
  | typeof QuestionMark
  | typeof Minus
  | typeof Underscore
  | typeof Asterisk
  | typeof Degree
  | typeof Equal
  | typeof Negation
  | typeof Dot
  | typeof Ellipsis;

// Paragraph end markers
export const SingleParagraphSeparator = {_type: 'SingleParagraphSeparator'};
export const DoubleParagraphSeparator = {_type: 'DoubleParagraphSeparator'};

export type ParagraphSeparator = typeof SingleParagraphSeparator | typeof DoubleParagraphSeparator;

// Text

export interface LowerCaseTextToken {
  lowerText: string;
}

export interface UpperCaseTextToken {
  upperText: string;
}

export type TextToken = LowerCaseTextToken | UpperCaseTextToken;

// TODO...

export type Token = TextToken | Clamps | PunctuationMarks | ParagraphSeparator;
