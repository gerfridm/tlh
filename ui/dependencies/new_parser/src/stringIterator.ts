export class StringIterator {
  private position = -1;

  constructor(private source: string) {
  }

  next(): string | undefined {
    this.position++;
    return this.position < this.source.length
      ? this.source.charAt(this.position)
      : undefined;
  }

  peek(): string | undefined {
    return this.position + 1 < this.source.length
      ? this.source.charAt(this.position + 1)
      : undefined;
  }

  peekTwo(): [undefined, undefined] | [string, string | undefined] {
    const first = this.peek();

    if (first !== undefined) {
      const second = this.position + 2 < this.source.length
        ? this.source.charAt(this.position + 2)
        : undefined;

      return [first, second];
    } else {
      return [undefined, undefined];
    }
  }

  nextIf(compareChar: string) {
    return this.peek() === compareChar
      ? this.next()
      : undefined;
  }

  getPosition(): number {
    return this.position;
  }
}