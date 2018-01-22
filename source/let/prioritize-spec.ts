/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import { merge } from "rxjs/observable/merge";
import { bufferCount } from "rxjs/operators/bufferCount";
import { concatMap } from "rxjs/operators/concatMap";
import { filter } from "rxjs/operators/filter";
import { mapTo } from "rxjs/operators/mapTo";
import { mergeMapTo } from "rxjs/operators/mergeMapTo";
import { toArray } from "rxjs/operators/toArray";
import { window } from "rxjs/operators/window";
import { async } from "rxjs/scheduler/async";
import { marbles } from "rxjs-marbles";
import { prioritize } from "./prioritize";

describe("let/prioritize", () => {

    it("should control the subscription order", () => {

        const source = of(1);
        const result = source.pipe(
            prioritize((first, second) => merge(
                first.pipe(mapTo("first")),
                second.pipe(mapTo("second"))
            )),
            toArray()
        );
        return result.toPromise().then(value => expect(value).to.deep.equal(["first", "second"]));
    });

    it("should support self notifications", () => {

        const source = from("aabbccddee", async);
        const result = source.pipe(
            prioritize((first, second) => second.pipe(
                window(first.pipe(
                    bufferCount(2, 1),
                    filter(([previous, current]) => current !== previous)
                )),
                concatMap(w => w.pipe(toArray())),
                toArray()
            ))
        );
        return result.toPromise().then(value => expect(value).to.deep.equal(
            [["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"], []]
        ));
    });

    it("should support synchronous sources", () => {

        const source = from("aabbccddee");
        const result = source.pipe(
            prioritize((first, second) => second.pipe(
                window(first.pipe(
                    bufferCount(2, 1),
                    filter(([previous, current]) => current !== previous)
                )),
                concatMap(w => w.pipe(toArray())),
                toArray()
            ))
        );
        return result.toPromise().then(value => expect(value).to.deep.equal(
            [["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"], []]
        ));
    });

    it("should unsubscribe from the source", marbles(m => {

        const source =    m.cold(   "-1-2-3----4--");
        const sourceSubs =       "   ^      !     ";

        const result = source.pipe(prioritize(merge), filter(() => false));

        const subscriber = m.hot("   a|           ").pipe(mergeMapTo(result));
        const unsub  =           "          !     ";
        const expected   =       "   --------     ";

        m.expect(subscriber, unsub).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSubs);
    }));
});
