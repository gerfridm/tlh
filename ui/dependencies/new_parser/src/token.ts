// Parentheses, Brackets, Braces, ...
export const LeftParenthesis = {_type: 'LeftParenthesis'};
export const RightParenthesis = {_type: 'RightParenthesis'};

export const LeftBracket = '[';
export const RightBracket = ']';

export const LeftBrace = '{';
export const RightBrace = '}';

export const TopLeftHalfBracket = {_type: 'TopLeftHalfBracket'};
export const TopRightHalfBracket = {_type: 'TopRightHalfBracket'};

export type Clamps = typeof LeftParenthesis
  | typeof RightParenthesis
  | typeof LeftBracket
  | typeof RightBracket
  | typeof LeftBrace
  | typeof RightBrace
  | typeof TopLeftHalfBracket
  | typeof TopRightHalfBracket;

// Punctuation marks

export const ExclamationMark = {_type: 'ExclamationMark'};
export const QuestionMark = {_type: 'QuestionMark'};
export const Minus = {_type: 'Minus'};
export const Underscore = {_type: 'Underscore'};
export const Asterisk = {_type: 'Asterisk'};
export const Degree = {_type: 'Degree'};
export const Equal = {_type: 'Equal'};
export const Negation = {_type: 'Negation'};
export const Dot = {_type: 'Dot'};
export const Ellipsis = {_type: 'Ellipsis'};

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

// TODO...

export type Token = Clamps | PunctuationMarks | ParagraphSeparator;
