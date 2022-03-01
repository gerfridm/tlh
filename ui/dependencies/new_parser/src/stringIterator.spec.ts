import {StringIterator} from './stringIterator';

describe('StringIterator', () => {
  // FIXME: implement tests!

  it('should next', () => {
    const si = new StringIterator('this');
    expect(si.next()).toEqual('t');
    expect(si.next()).toEqual('h');
    expect(si.next()).toEqual('i');
    expect(si.next()).toEqual('s');
    expect(si.next()).toEqual(undefined);
  });

  it('should peek', () => {
    const si = new StringIterator('this');

    expect(si.peek()).toEqual('t');
    expect(si.next()).toEqual('t');

    expect(si.peek()).toEqual('h');
    expect(si.next()).toEqual('h');

    expect(si.peek()).toEqual('i');
    expect(si.next()).toEqual('i');

    expect(si.peek()).toEqual('s');
    expect(si.next()).toEqual('s');

    expect(si.peek()).toEqual(undefined);
    expect(si.next()).toEqual(undefined);
  });

  it('should peekTwo', () => {
    const si = new StringIterator('this');

    expect(si.peekTwo()).toEqual(['t', 'h']);
    expect(si.next()).toEqual('t');

    expect(si.peekTwo()).toEqual(['h', 'i']);
    expect(si.next()).toEqual('h');

    expect(si.peekTwo()).toEqual(['i', 's']);
    expect(si.next()).toEqual('i');

    expect(si.peekTwo()).toEqual(['s', undefined]);
    expect(si.next()).toEqual('s');

    expect(si.peekTwo()).toEqual([undefined, undefined]);
    expect(si.next()).toEqual(undefined);
  });

  it('should nextIf', () => {
    const si = new StringIterator('this');

    expect(si.nextIf('h')).toEqual(undefined);
    expect(si.getPosition()).toEqual(-1);

    expect(si.nextIf('t')).toEqual('t');
    expect(si.getPosition()).toEqual(0);

    expect(si.nextIf('h')).toEqual('h');
    expect(si.getPosition()).toEqual(1);

    expect(si.nextIf('i')).toEqual('i');
    expect(si.getPosition()).toEqual(2);

    expect(si.nextIf('s')).toEqual('s');
    expect(si.getPosition()).toEqual(3);

    expect(si.nextIf('s')).toEqual(undefined);
    expect(si.getPosition()).toEqual(3);

    expect(si.next()).toEqual(undefined);
  });

  it('should nextTwoIf', () => {
    const si = new StringIterator('this');

    expect(si.nextTwoIf('a', 'b')).toEqual(undefined);
    expect(si.nextTwoIf('t', 'e')).toEqual(undefined);
    expect(si.getPosition()).toEqual(-1);

    expect(si.nextTwoIf('t', 'h')).toEqual(['t', 'h']);
    expect(si.getPosition()).toEqual(1);

    expect(si.nextTwoIf('i', 's')).toEqual(['i', 's']);
    expect(si.getPosition()).toEqual(3);
  });
});