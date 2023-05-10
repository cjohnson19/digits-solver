import {solveDigits} from '../src';

describe('Solves simple case', () => {
  it('Should find addition', () => {
    const avail = [1, 2];
    const o = solveDigits(3, avail);
    expect(o).toHaveLength(2);
  });

  it('Should solve simple real example', () => {
    const avail = [1, 2, 3, 4, 10, 25];
    const o = solveDigits(55, avail);
    expect(o.length > 0).toBe(true);
    expect(o[0].size()).toBe(2);
  });

  it('Should solve hard real example', () => {
    const avail = [3, 9, 11, 19, 23, 25];
    const o = solveDigits(424, avail);
    expect(o.length > 0).toBe(true);
    expect(o[0].size()).toBe(3);
  });

  it('Should solve useless real example', () => {
    const avail = [5, 7, 9, 10, 11, 25];
    const goal = 173;
    const o = solveDigits(goal, avail);
    expect(o.length > 0).toBe(true);
    expect(o[0].size()).toBe(3);
  });

  it('Should solve other real example', () => {
    const avail = [3, 4, 5, 6, 20, 25];
    const goal = 246;
    const o = solveDigits(goal, avail);
    expect(o.length > 0).toBe(true);
    expect(o[0].size()).toBe(3);
  });

  it('Should solve last real example', () => {
    const avail = [6, 7, 8, 11, 15, 20];
    const goal = 328;
    const o = solveDigits(goal, avail);
    expect(o.length > 0).toBe(true);
    expect(o[0].size()).toBe(3);
  });
});
