import {HashSet} from './hashset';
import {Expression, ValExp, nextSteps} from './expression';

export function solveDigits(goal: number, avail: number[]): Expression[] {
  const ans: Expression[] = [];
  const f: (es: Expression[]) => string = (es: Expression[]) =>
    es.map(e => e.hash()).join('');
  const seen: HashSet<Expression[]> = new HashSet<Expression[]>(f);
  function aux(a: Expression[]): void {
    if (a.length === 0) return;
    if (seen.has(a)) return;
    if (a.length === 1 && a[0].val === goal) {
      ans.push(a[0]);
      return;
    }
    seen.add(a);
    a.forEach((h, i) => {
      const tl = [...a.slice(0, i), ...a.slice(i + 1, a.length)];
      nextSteps(h, tl).forEach(s => {
        s.forEach(j => {
          aux(j);
        });
      });
    });
    aux(a.slice(1));
  }
  const exps = avail.map(n => new ValExp(n));
  aux(exps);
  ans.sort((a, b) => a.size() - b.size());
  return ans;
}
