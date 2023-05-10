export class HashSet<Entry> {
  private _map: Map<string, Entry> = new Map<string, Entry>();
  private f: (e: Entry) => string;

  constructor(f: (e: Entry) => string) {
    this.f = f;
  }

  add(e: Entry): void {
    this._map.set(this.f(e), e);
  }

  entries(): IterableIterator<Entry> {
    return this._map.values();
  }

  has(e: Entry): boolean {
    return this._map.has(this.f(e));
  }
}
