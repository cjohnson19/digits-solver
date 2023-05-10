import {OpExp, ValExp, nextSteps} from '../src/expression';

describe('Value tests', () => {
  describe('Size', () => {
    it('Val has size 0', () => {
      const v = new ValExp(1);
      expect(v.size()).toBe(0);
    });
  });

  describe('Valid', () => {
    it('Is valid when positive integer', () => {
      const v = new ValExp(1);
      expect(v.isValid()).toBe(true);
    });

    it('Is invalid when negative integer', () => {
      const v = new ValExp(-1);
      expect(v.isValid()).toBe(false);
    });

    it('Is invalid when zero', () => {
      const v = new ValExp(0);
      expect(v.isValid()).toBe(false);
    });
  });
});

describe('Binary Operator tests', () => {
  describe('Size', () => {
    it('Works on blanced expressions', () => {
      const l = new ValExp(1);
      const r = new ValExp(2);
      const e = new OpExp('plus', l, r);
      expect(e.size()).toBe(1);
    });

    it('Takes sum of left subexpressions', () => {
      const l = new OpExp('plus', new ValExp(1), new ValExp(2));
      const r = new ValExp(2);
      const e = new OpExp('plus', l, r);
      expect(e.size()).toBe(2);
    });

    it('Takes sum of right subexpressions', () => {
      const l = new ValExp(2);
      const r = new OpExp('plus', new ValExp(1), new ValExp(2));
      const e = new OpExp('plus', l, r);
      expect(e.size()).toBe(2);
    });
  });

  describe('toString', () => {
    it('Works for plus', () => {
      const l = new ValExp(1);
      const r = new ValExp(2);
      const e = new OpExp('plus', l, r);
      expect(e.toString()).toBe('1 + 2');
    });

    it('Works for minus', () => {
      const l = new ValExp(1);
      const r = new ValExp(2);
      const e = new OpExp('minus', l, r);
      expect(e.toString()).toBe('1 - 2');
    });

    it('Works for times', () => {
      const l = new ValExp(1);
      const r = new ValExp(2);
      const e = new OpExp('times', l, r);
      expect(e.toString()).toBe('1 x 2');
    });

    it('Works for division', () => {
      const l = new ValExp(1);
      const r = new ValExp(2);
      const e = new OpExp('divide', l, r);
      expect(e.toString()).toBe('1 / 2');
    });

    it('Parenthesizes subexpressions which need to be', () => {
      const l1 = new ValExp(1);
      const l2 = new ValExp(2);
      const l = new OpExp('plus', l1, l2);
      const r = new ValExp(3);
      const e = new OpExp('times', l, r);
      expect(e.toString()).toBe('(1 + 2) x 3');
    });

    it('Parenthesizes subexpressions which need to be', () => {
      const r1 = new ValExp(1);
      const r2 = new ValExp(2);
      const r = new OpExp('plus', r1, r2);
      const l = new ValExp(3);
      const e = new OpExp('times', l, r);
      expect(e.toString()).toBe('3 x (1 + 2)');
    });

    it('Does not parenthesize subexpressions if same precendence', () => {
      const l1 = new ValExp(1);
      const l2 = new ValExp(2);
      const l = new OpExp('plus', l1, l2);
      const r = new ValExp(3);
      const e = new OpExp('plus', l, r);
      expect(e.toString()).toBe('1 + 2 + 3');
    });
  });
});

describe('Merging', () => {
  it('Should merge expression with single expression', () => {
    const e = new ValExp(2);
    const a = [new ValExp(1)];
    // Expect -> [[[1 + 2], [2 + 1]], ... ]
    const out = nextSteps(e, a);
    expect(out).toHaveLength(1);
    expect(out[0]).toHaveLength(4);
  });

  it('Should merge expression with two expressions', () => {
    const e = new ValExp(2);
    const a = [new ValExp(1), new ValExp(3)];
    // Expect -> [[[1 + 2], [2 + 1]], ... ]
    const out = nextSteps(e, a);
    expect(out).toHaveLength(2);
    expect(out[0]).toHaveLength(4);
    expect(out[1]).toHaveLength(2);
  });
});
