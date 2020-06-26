/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

/*tslint:disable:no-unused-expression*/
/*tslint:disable:rxjs-no-ignored-subscription*/
/*tslint:disable:throw-error*/

import { expect } from "chai";
import { from, Observable } from "rxjs";
import { marbles } from "rxjs-marbles";
import { map } from "rxjs/operators";
import { concatEagerMap } from "./concatEagerMap";

describe("concatEagerMap", () => {
  it(
    "should map-sort-and-flatten each item to an Observable",
    marbles((m) => {
      const e1 = m.hot("--1-----3----5------------------|");

      const e2 = m.cold(" x--------x--------x|            ", { x: 10 });
      //                        y--------y--------y|
      //                             z--------z--------z|

      const expected = "--x--------x--------x(yy)-y(zz)z|";

      const values = { x: 10, y: 30, z: 50 };

      const result = e1.pipe(
        concatEagerMap((x) => e2.pipe(map((i) => i * +x)))
      );

      m.expect(result).toBeObservable(expected, values);
    })
  );

  it(
    "should concatEagerMap many regular interval inners",
    marbles((m) => {
      const e1 = m.hot("a---b-----------c-------d-------|         ");

      const a = m.cold("----a---a---a---(a|)                      ");
      const b = m.cold("    ----b---b---(b|)                      ");
      const c = m.cold("                ------c---c---c---c---(c|)");
      const d = m.cold("                        ----(d|)          ");

      const expected = "----a---a---a---(abbb)c---c---c---c---(cd|)";

      const observableLookup: Record<string, Observable<string>> = {
        a: a,
        b: b,
        c: c,
        d: d,
      };
      const source = e1.pipe(
        concatEagerMap((value) => observableLookup[value])
      );

      m.expect(source).toBeObservable(expected);
    })
  );

  it("should map values to constant resolved promises and merge", (done) => {
    const source = from([4, 3, 2, 1]);
    const project = () => from(Promise.resolve(42));

    const results: number[] = [];
    source.pipe(concatEagerMap(project)).subscribe(
      (x) => {
        results.push(x);
      },
      () => {
        done(new Error("Subscriber error handler not supposed to be called."));
      },
      () => {
        expect(results).to.deep.equal([42, 42, 42, 42]);
        done();
      }
    );
  });

  it("should map values to constant rejected promises and merge", (done) => {
    const source = from([4, 3, 2, 1]);
    const project = function () {
      return from(Promise.reject<number>(42));
    };

    source.pipe(concatEagerMap(project)).subscribe(
      () => {
        done(new Error("Subscriber next handler not supposed to be called."));
      },
      (err) => {
        expect(err).to.equal(42);
        done();
      },
      () => {
        done(
          new Error("Subscriber complete handler not supposed to be called.")
        );
      }
    );
  });

  it("should map values to resolved promises and merge", (done) => {
    const source = from([4, 3, 2, 1]);
    const project = function (value: number, index: number) {
      return from(Promise.resolve(value + index));
    };

    const results: number[] = [];
    source.pipe(concatEagerMap(project)).subscribe(
      (x) => {
        results.push(x);
      },
      () => {
        done(new Error("Subscriber error handler not supposed to be called."));
      },
      () => {
        expect(results).to.deep.equal([4, 4, 4, 4]);
        done();
      }
    );
  });

  it("should map values to rejected promises and merge", (done) => {
    const source = from([4, 3, 2, 1]);
    const project = function (value: number, index: number) {
      return from(Promise.reject<string>(`${value}-${index}`));
    };

    source.pipe(concatEagerMap(project)).subscribe(
      () => {
        done(new Error("Subscriber next handler not supposed to be called."));
      },
      (err) => {
        expect(err).to.equal("4-0");
        done();
      },
      () => {
        done(
          new Error("Subscriber complete handler not supposed to be called.")
        );
      }
    );
  });

  it(
    "should concatEagerMap many outer values to many inner values",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i----j----k----l---|", values);

      const e1 = m.hot("-a--------b--------c--------d-|");
      //"                                           ----i----j----k----l---|",
      //"                                  ----i----j----k----l---|",
      //"                         ----i----j----k----l---|",
      //"                ----i----j----k----l---|",
      const expected = "-----i----j----k----l---(ijk)l---(ijk)l---(ijk)l---|";

      const result = e1.pipe(concatEagerMap(() => inner));

      m.expect(result).toBeObservable(expected, values);
    })
  );

  it(
    "should concatEagerMap many outer values to many inner values, complete late",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i----j----k----l---|", values);

      const e1 = m.hot("-a--------b--------c--------d-----------------------|");
      //"                                           ----i----j----k----l---|",
      //"                                  ----i----j----k----l---|",
      //"                         ----i----j----k----l---|",
      //"                ----i----j----k----l---|",
      const expected = "-----i----j----k----l---(ijk)l---(ijk)l---(ijk)l----|";

      const result = e1.pipe(concatEagerMap(() => inner));

      m.expect(result).toBeObservable(expected, values);
    })
  );

  it(
    "should concatEagerMap many outer values to many inner values, outer never completes",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i----j----k----l---|", values);

      const e1 = m.hot("-a--------b--------c--------d------------------------");
      //"                                           ----i----j----k----l---|",
      //"                                  ----i----j----k----l---|",
      //"                         ----i----j----k----l---|",
      //"                ----i----j----k----l---|",
      const expected = "-----i----j----k----l---(ijk)l---(ijk)l---(ijk)l-----";

      const result = e1.pipe(concatEagerMap(() => inner));

      m.expect(result).toBeObservable(expected, values);
    })
  );

  it(
    "should not break unsubscription chains when result is unsubscribed explicitly",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i----j----k----l---|", values);

      const e1 = m.hot("-a--------b--------c--------d------------------------");
      const e1subs = "  ^---------------------------------------------------!";
      //"                                           ----i----j----k----l---|",
      //"                                  ----i----j----k----l---|",
      //"                         ----i----j----k----l---|",
      //"                ----i----j----k----l---|",
      const expected = "-----i----j----k----l---(ijk)l---(ijk)l---(ijk)l-----";
      const unsub = "   ----------------------------------------------------!";

      const source = e1.pipe(
        map((x) => x),
        concatEagerMap(() => inner),
        map((x) => x)
      );

      m.expect(source, unsub).toBeObservable(expected, values);
      m.expect(e1).toHaveSubscriptions(e1subs);
    })
  );

  it(
    "should concatEagerMap many outer to many inner, and inner throws",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i---j---k---l-------#        ", values);

      const e1 = m.hot("-a-------b-------c-------d-------|");
      const e1subs = "  ^------------------------!";
      //                 ----i---j---k---l-------#
      //                         ----i---j---k---l-------#
      //                                 ----i---j---k---l-------#
      //                                         ----i---j---k---l-------#
      const expected = "-----i---j---k---l-------#        ";

      const result = e1.pipe(concatEagerMap(() => inner));

      m.expect(result).toBeObservable(expected, values);
      m.expect(e1).toHaveSubscriptions(e1subs);
    })
  );

  it(
    "should concatEagerMap many outer to many inner, and outer throws",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i----j----k----l---|", values);

      const e1 = m.hot("-a--------b--------c--------d---------#");
      const e1subs = "  ^-------------------------------------!";
      //"                                           ----i----j----k----l---|",
      //"                                  ----i----j----k----l---|",
      //"                         ----i----j----k----l---|",
      //"                ----i----j----k----l---|",
      const expected = "-----i----j----k----l---(ijk)l---(ijk)#";

      const source = e1.pipe(concatEagerMap(() => inner));

      m.expect(source).toBeObservable(expected, values);
      m.expect(e1).toHaveSubscriptions(e1subs);
    })
  );

  it(
    "should concatEagerMap many outer to many inner, both inner and outer throw",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold("----i----j----k----l---#", values);

      const e1 = m.hot("-a--------b--------c--------d---------#");
      const e1subs = "  ^-----------------------!              ";
      //                                            ----i----j----k----l---#",
      //                                   ----i----j----k----l---#",
      //                          ----i----j----k----l---#",
      //                 ----i----j----k----l---#",
      const expected = "-----i----j----k----l---#              ";

      const source = e1.pipe(concatEagerMap(() => inner));

      m.expect(source).toBeObservable(expected, values);
      m.expect(e1).toHaveSubscriptions(e1subs);
    })
  );

  it(
    "should concatEagerMap to many cold Observable, with parameter concurrency=1",
    marbles((m) => {
      const values = { i: "foo", j: "bar", k: "baz", l: "qux" };
      const inner = m.cold(
        "----i---j---k---l---|                                        ",
        values
      );

      const e1 = m.hot(
        "-a-------b-------c---|                                        "
      );
      const e1subs =
        "^--------------------!                                        ";
      const innersubs = [
        "-^-------------------!                                        ",
        "---------------------^-------------------!                    ",
        "-----------------------------------------^-------------------!",
      ];
      //  ----i---j---k---l---|                                        ",
      //                      ----i---j---k---l---|                                        ",
      //                                          ----i---j---k---l---|                                        ",
      const expected =
        "-----i---j---k---l-------i---j---k---l-------i---j---k---l---|";

      function project() {
        return inner;
      }
      const result = e1.pipe(concatEagerMap(project, 1));

      m.expect(result).toBeObservable(expected, values);
      m.expect(inner).toHaveSubscriptions(innersubs);
      m.expect(e1).toHaveSubscriptions(e1subs);
    })
  );
});
