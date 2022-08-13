import { marbles } from "rxjs-marbles";
import { bufferCountWithTimeout } from "./bufferCountWithTimeout";

describe("bufferCountWithTimeout", () => {
  it("should support count=1", () => {
    marbles((m) => {
      const source = m.cold("  -a-b-c-|");
      const expected = m.cold("-0-1-2-|", [["a"], ["b"], ["c"]]);
      m.expect(
        source.pipe(bufferCountWithTimeout({ count: 1, timeout: 1000 }))
      ).toBeObservable(expected);
    });
  });
  it("should support count=2", () => {
    marbles((m) => {
      const source = m.cold("  -a-b-c-|");
      const expected = m.cold("---0---(1|)", [["a", "b"], ["c"]]);
      m.expect(
        source.pipe(bufferCountWithTimeout({ count: 2, timeout: 1000 }))
      ).toBeObservable(expected);
    });
  });
  it("should support timeout", () => {
    marbles((m) => {
      const source = m.cold("  -a-b-c-|");
      const t = m.time("        ---|");
      const expected = m.cold("----0--(1|)", [["a", "b"], ["c"]]);
      m.expect(
        source.pipe(bufferCountWithTimeout({ count: 100, timeout: t }))
      ).toBeObservable(expected);
    });
  });
  it("should support a long silent period", () => {
    marbles((m) => {
      const source = m.cold("  -a-b--------");
      const t = m.time("        ----|");
      const expected = m.cold("---0--------", [["a", "b"]]);
      m.expect(
        source.pipe(bufferCountWithTimeout({ count: 2, timeout: t }))
      ).toBeObservable(expected);
    });
  });
  it("should support a complex situation", () => {
    marbles((m) => {
      const source = m.cold("  -a-b--c----defgh-----|");
      const t = m.time("        ----|");
      //                             ----|
      //                                  ----|
      //                                     ----|
      const expected = m.cold("-----0----1--2----3--|", [
        ["a", "b"],
        ["c"],
        ["d", "e", "f"],
        ["g", "h"],
      ]);
      m.expect(
        source.pipe(bufferCountWithTimeout({ count: 3, timeout: t }))
      ).toBeObservable(expected);
    });
  });
});
