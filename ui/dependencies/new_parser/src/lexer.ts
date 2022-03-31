import {
  Asterisk,
  Degree,
  Dot,
  DoubleParagraphSeparator,
  Ellipsis,
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
  Token,
  TopLeftHalfBracket,
  TopRightHalfBracket,
  Underscore
} from './token';
import {StringIterator} from './stringIterator';

export function lex(source: string): Token[] {

  const stringIterator = new StringIterator(source);

  const tokens: Token[] = [];

  let currentCharacter = stringIterator.next();
  while (currentCharacter) {
    switch (currentCharacter) {
      // Clamps
      case '(':
        tokens.push(LeftParenthesis);
        break;
      case ')':
        tokens.push(RightParenthesis);
        break;
      case '[' :
        tokens.push(LeftBracket);
        break;
      case ']':
        tokens.push(RightBracket);
        break;
      case '{':
        tokens.push(LeftBrace);
        break;
      case '}':
        tokens.push(RightBrace);
        break;
      case '⸢':
        tokens.push(TopLeftHalfBracket);
        break;
      case '⸣':
        tokens.push(TopRightHalfBracket);
        break;
      // Punctuation marks
      case '!':
        tokens.push(ExclamationMark);
        break;
      case '?':
        tokens.push(QuestionMark);
        break;
      case '-':
        tokens.push(Minus);
        break;
      case '_':
        tokens.push(Underscore);
        break;
      case '*':
        tokens.push(Asterisk);
        break;
      case '°':
        tokens.push(Degree);
        break;
      case '…':
        tokens.push(Ellipsis);
        break;
      case '.':
        // FIXME!
        tokens.push(stringIterator.nextTwoIf('.', '.') !== undefined ? Ellipsis : Dot);
        break;
      case '§':
        tokens.push(stringIterator.nextIf('§') !== undefined ? DoubleParagraphSeparator : SingleParagraphSeparator);
        break;
      case '=':
        tokens.push(stringIterator.nextTwoIf('=', '=') !== undefined ? DoubleParagraphSeparator : Equal);
        break;
      case '¬':
        tokens.push(stringIterator.nextTwoIf('¬', '¬') !== undefined ? SingleParagraphSeparator : Negation);
        break;
      case ' ':
      case '\t':
        // Ignore whitespace
        break;
      case '\n':
        throw new Error('unexpected newline!');
      default:
        console.info(currentCharacter);
        throw new Error('TODO!');
    }

    currentCharacter = stringIterator.next();
  }


  return tokens;
}