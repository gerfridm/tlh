import {
  Asterisk,
  Degree,
  DoubleParagraphSeparator,
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
      case '§':
        if (stringIterator.nextIf('§') !== undefined) {
          // FIXME: paragraph separator!
          tokens.push(DoubleParagraphSeparator);
        } else {
          tokens.push(SingleParagraphSeparator);
        }
        break;
      case '=':
        if (stringIterator.nextTwoIf('=', '=') !== undefined) {
          tokens.push(DoubleParagraphSeparator);
          stringIterator.next();
          stringIterator.next();
        } else {
          tokens.push(Equal);
        }
        break;
      case '¬':
        if (stringIterator.nextTwoIf('¬', '¬') !== undefined) {
          tokens.push(SingleParagraphSeparator);
        } else {
          tokens.push(Negation);
        }
        break;
      case ' ':
      case '\t':
        // Ignore whitespace
        break;
      default:
        console.info(currentCharacter);
        throw new Error('TODO!');
    }

    currentCharacter = stringIterator.next();
  }


  return tokens;
}