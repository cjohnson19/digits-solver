export abstract class Expression {
  val: number;

  constructor(val: number) {
    this.val = val;
  }

  abstract size(): number;

  isValid(): boolean {
    return this.val % 1 === 0 && this.val > 0;
  }

  abstract toString(): string;

  abstract eq(other: Expression): boolean;

  abstract hash(): string;
}

export type operation = 'plus' | 'minus' | 'times' | 'divide';

export class OpExp extends Expression {
  op: operation;
  left: Expression;
  right: Expression;

  constructor(op: operation, left: Expression, right: Expression) {
    super(OpExp.calc(left, right, op));
    this.op = op;
    this.left = left;
    this.right = right;
  }

  size(): number {
    return 1 + this.left.size() + this.right.size();
  }

  private opToString(): string {
    switch (this.op) {
      case 'plus':
        return '+';
      case 'minus':
        return '-';
      case 'times':
        return 'x';
      case 'divide':
        return '/';
    }
  }

  private static opToPrecedence(op: operation): number {
    switch (op) {
      case 'plus':
        return 1;
      case 'minus':
        return 1;
      case 'times':
        return 0;
      case 'divide':
        return 0;
    }
  }

  private static parenIfNeeded(e: Expression, op: operation): string {
    const s = e.toString();
    if (
      e instanceof OpExp &&
      OpExp.opToPrecedence(e.op) > OpExp.opToPrecedence(op)
    ) {
      return `(${s})`;
    }
    return s;
  }

  toString(): string {
    const lStr = OpExp.parenIfNeeded(this.left, this.op);
    const rStr = OpExp.parenIfNeeded(this.right, this.op);
    return `${lStr} ${this.opToString()} ${rStr}`;
  }

  private isComm(): boolean {
    switch (this.op) {
      case 'plus':
      case 'times':
        return true;
      default:
        return false;
    }
  }

  eq(other: Expression): boolean {
    return (
      other instanceof OpExp &&
      this.val === other.val &&
      ((this.left.eq(other.left) && this.right.eq(other.right)) ||
        (this.isComm() &&
          this.left.eq(other.right) &&
          this.right.eq(other.left)))
    );
  }

  private static calc(
    left: Expression,
    right: Expression,
    op: operation
  ): number {
    const l = left.val;
    const r = right.val;
    switch (op) {
      case 'plus':
        return l + r;
      case 'minus':
        return l - r;
      case 'times':
        return l * r;
      case 'divide':
        return l / r;
    }
  }

  hash(): string {
    return `${this.val}${this.left.val}${this.opToString()}${this.right.val}`;
  }
}

export class ValExp extends Expression {
  constructor(val: number) {
    super(val);
  }

  size(): number {
    return 0;
  }

  toString(): string {
    return `${this.val}`;
  }

  eq(other: Expression): boolean {
    return other instanceof ValExp && other.val === this.val;
  }

  hash(): string {
    return `${this.val}`;
  }
}

function mergeExps(left: Expression, right: Expression): Expression[] {
  return [
    new OpExp('plus', left, right),
    new OpExp('minus', left, right),
    new OpExp('times', left, right),
    new OpExp('divide', left, right),
  ];
}

export function nextSteps(exp: Expression, a: Expression[]): Expression[][][] {
  const n = a.length;
  // for each expression we have available
  return a.map((e, i) =>
    // pair it with `exp`
    mergeExps(exp, e)
      // only take the valid ones
      .filter(n => n.isValid())
      // then fill in the other expressions in `a` that we didn't use
      .map(nxt => [...a.slice(0, i), ...a.slice(i + 1, n), nxt])
  );
}
