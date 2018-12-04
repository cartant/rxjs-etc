import { expect } from "chai";
import { combineLatest, Observable, of, OperatorFunction } from "rxjs";
import { map, publish, switchMap, withLatestFrom } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { pause } from "./pause";

// From Alex Okrushko's:
// https://stackblitz.com/edit/withlatesttruthy-fu4pcv?file=src%2Fwith_latest_truthy.ts

function withLatestTruthy<T>(...others: Observable<any>[]): OperatorFunction<T, any> {
    const combined = combineLatest(...others);
    return source => combined.pipe(
        publish(published => {
            const notifier = published.pipe(
                map(values => values.every(Boolean) ? "resumed" : "paused")
            );
            return source.pipe(
                pause(notifier, "paused"),
                withLatestFrom(published, (souceValue, otherValues) => [
                    souceValue,
                    ...otherValues
                ])
            );
        })
    );
}

describe.only("temp", () => {

    describe("withLatestTruthy operator", () => {
        let testScheduler: TestScheduler;

        beforeEach(() => {
            testScheduler = new TestScheduler((actual, expected) => {
                expect(actual).to.deep.equal(expected);
            });
        });

        it("should combine observables that emitted values", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("---a|");
                const v2 = hot("     ----1----");

                const expected = "   ----(r|)";

                expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                    r: ["a", "1"]
                });
            });
        });

        it("should wait for v2 to emit the value", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("--a|");
                const v2 = hot("     -------1");  // takes time to emit

                const expected = "   -------(r|)";

                expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                    r: ["a", "1"]
                });
            });
        });

        it("should not complete if the value from v2 never arrives", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("--a|");
                const v2 = hot("     ------------");  // does not emit values

                const unsub = "      ------------!";
                const expected = "   -------------";

                expectObservable(source.pipe(withLatestTruthy(v2)), unsub).toBe(expected);
            });
        });

        it("should use values that were previously emitted by inputObservable",
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("--a|");
                    const v2 = hot("     -1----------");  // value emitted prior to source

                    const expected = "   --r|";

                    expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                        r: ["a", "1"]
                    });
                });
            });

        it("should use v2 value once source emits, ignoring any further input values",
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("--a|");
                    const v2 = hot("     -1----2-----");  // value 1 should be used

                    const expected = "   --r|";

                    expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                        r: ["a", "1"]
                    });
                });
            });

        it("should ignore new values from v2, once the values were combined", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("--a|");
                const v2 = hot("     ----1-2-3-");  // values 2 and 3 are ignored

                const expected = "   ----(r|)";

                expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                    r: ["a", "1"]
                });
            });
        });
        //
        it(`should combine every source value with v2 value once it"s emitted`,
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("--a-b-c-d|");
                    // combine all sources with it
                    const v2 = hot("     ----------1---------");

                    const expected = "   ----------(rstu|)";

                    expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                        r: ["a", "1"],
                        s: ["b", "1"],
                        t: ["c", "1"],
                        u: ["d", "1"]
                    });
                });
            });

        it(`should combine every source value with cold v2 value once it"s emitted`,
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("--a-b-c-d|");
                    const v2 = cold("    --1---------");  // combinations are offset by 2

                    const expected = "   --r-s-t-u|";

                    expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                        r: ["a", "1"],
                        s: ["b", "1"],
                        t: ["c", "1"],
                        u: ["d", "1"]
                    });
                });
            });

        it(`should combine every source value with hot v2 value once it"s emitted`,
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("--a-b-c-d|");
                    const v2 = hot("     -1---------");  // combinations are offset by 2

                    const expected = "   --r-s-t-u|";

                    expectObservable(source.pipe(withLatestTruthy(v2))).toBe(expected, {
                        r: ["a", "1"],
                        s: ["b", "1"],
                        t: ["c", "1"],
                        u: ["d", "1"]
                    });
                });
            });

        it("should wait for all observables to emit the value, before it can combine",
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("--a|");
                    const v2 = hot("     -------2");  // all emit at different times
                    const v3 = hot("     -----3");
                    const v4 = hot("     ----------4");

                    const expected = "   ----------(r|)";

                    expectObservable(source.pipe(withLatestTruthy(v2, v3, v4)))
                        .toBe(expected, {r: ["a", "2", "3", "4"]});
                });
            });

        it("should wait for all observables to emit the value, and combine with all" +
                " the source emissions",
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("-a-b|");
                    const v2 = hot("     -------2");  // all emit at different times
                    const v3 = hot("     -----3");
                    const v4 = hot("     ----------4");

                    const expected = "   ----------(rs|)";

                    expectObservable(source.pipe(withLatestTruthy(v2, v3, v4)))
                        .toBe(expected, {
                            r: ["a", "2", "3", "4"],
                            s: ["b", "2", "3", "4"]
                        });
                });
            });

        it("should use the latest value from the input observables that became" +
                " available",
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("-ab-c|");
                    const v2 = hot("     -------2");
                    // all combined with 3, regardless that a and b got the 1 at first.
                    const v3 = hot("     ---1--3");

                    const expected = "   -------(rst|)";

                    expectObservable(source.pipe(withLatestTruthy(v2, v3)))
                        .toBe(expected, {
                            r: ["a", "2", "3"],
                            s: ["b", "2", "3"],
                            t: ["c", "2", "3"]
                        });
                });
            });

        it("should be able to cancel previous source emitted, so that the source " +   "values are not stacked",
            () => {
                testScheduler.run(({expectObservable, hot, cold}) => {
                    const source = cold("-ab-c|");
                    const v2 = hot("     -------2");
                    // all combined with 3, regardless that a and b got the 1 at first.
                    const v3 = hot("     ---1--3");

                    const expected = "   -------(r|)";

                    expectObservable(source.pipe(switchMap(s => of(s).pipe(withLatestTruthy(v2, v3)))))
                        .toBe(expected, {
                            r: ["c", "2", "3"]
                        });
                });
            });

        it("should ignore null values", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("-a|");
                // n value is ignored
                const v2 = hot("     ---n---2", {n: null, "2": "2"});
                const v3 = hot("     -----3");

                const expected = "   -------(r|)";

                expectObservable(source.pipe(withLatestTruthy(v2, v3))).toBe(expected, {
                    r: ["a", "2", "3"]
                });
            });
        });

        it("should wait for a new truthy input value after null", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("-a--------b|");
                // 4 is used, even through there was 2 prior to that, but n resets that
                const v2 = hot("     ---2----n-----4", {n: null, "2": "2", "4": "4"});
                const v3 = hot("     -----3");

                const expected = "   -----r--------(s|)";

                expectObservable(source.pipe(withLatestTruthy(v2, v3))).toBe(expected, {
                    r: ["a", "2", "3"],
                    s: ["b", "4", "3"]
                });
            });
        });

        it("should ignore nulls in multiple inputs that we emitted prior to source", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("----------a|");
                const v2 = hot("     --n--2--4", {n: null, "2": "2", "4": "4"});
                const v3 = hot("     --3-n----5", {n: null, "3": "3", "5": "5"});

                const expected = "   ----------r|";

                expectObservable(source.pipe(withLatestTruthy(v2, v3))).toBe(expected, {
                    r: ["a", "4", "5"]
                });
            });
        });

        it("should pick up the latest truthy values after source is emitted", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("-a|");
                const v2 = hot("     --n--2--4", {n: null, "2": "2", "4": "4"});
                const v3 = hot("     --3-n----5", {n: null, "3": "3", "5": "5"});

                const expected = "   ---------(r|)";

                expectObservable(source.pipe(withLatestTruthy(v2, v3))).toBe(expected, {
                    r: ["a", "4", "5"]
                });
            });
        });

        it("test for Ben", () => {
            testScheduler.run(({expectObservable, hot, cold}) => {
                const source = cold("--a--b--c--d--|");
                // 4 is used, even through there was 2 prior to that, but n resets that
                const v2 = hot("     -1--2-3-4-----|");
                const v3 = hot("     ------------------5-------6--7--8--|");

                const expected = "   ------------------(rstu|)";

                expectObservable(source.pipe(withLatestTruthy(v2, v3))).toBe(expected, {
                    r: ["a", "4", "5"],
                    s: ["b", "4", "5"],
                    t: ["c", "4", "5"],
                    u: ["d", "4", "5"]
                });
            });
        });
    });
});
