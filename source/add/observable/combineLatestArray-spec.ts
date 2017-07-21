/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { Observable } from "rxjs/Observable";
import { marbles } from "rxjs-marbles";

import "./combineLatestArray";

describe("observable/combineLatestArray", () => {

    it("should combine a single observable", marbles((m) => {

        const source =   m.cold("ab----|", { a: 1, b: 2 });
        const subs =            "^-----!";
        const expected = m.cold("xy----|", { x: [1], y: [2] });

        const destination = Observable.combineLatestArray([source]);
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should combine multiple observables", marbles((m) => {

        const source1 =  m.cold("a-b---|", { a: 1, b: 2 });
        const source2 =  m.cold("-i-j--|", { i: 3, j: 4 });
        const subs =            "^-----!";
        const expected = m.cold("-xyz--|", { x: [1, 3], y: [2, 3], z: [2, 4] });

        const destination = Observable.combineLatestArray([source1, source2]);
        m.expect(destination).toBeObservable(expected);
        m.expect(source1).toHaveSubscriptions(subs);
        m.expect(source2).toHaveSubscriptions(subs);
    }));

    it("should emit an empty array when observables is empty", marbles((m) => {

        const expected = m.cold("(x|)", { x: [] });

        const destination = Observable.combineLatestArray([]);
        m.expect(destination).toBeObservable(expected);
    }));

    it("should support project for a single observable", marbles((m) => {

        const source =   m.cold("ab---|", { a: 1, b: 2 });
        const subs =            "^----!";
        const expected = m.cold("xy---|", { x: [2], y: [3] });

        const destination = Observable.combineLatestArray(
            [source],
            (values) => values.map((value) => value + 1)
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support project for multiple observables", marbles((m) => {

        const source1 =  m.cold("a-b---|", { a: 1, b: 2 });
        const source2 =  m.cold("-i-j--|", { i: 3, j: 4 });
        const subs =            "^-----!";
        const expected = m.cold("-xyz--|", { x: [2, 4], y: [3, 4], z: [3, 5] });

        const destination = Observable.combineLatestArray(
            [source1, source2],
            (values) => values.map((value) => value + 1)
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source1).toHaveSubscriptions(subs);
        m.expect(source2).toHaveSubscriptions(subs);
    }));

    it("should support project when observables is empty", marbles((m) => {

        const expected = m.cold("(x|)", { x: ["empty"] });

        const destination = Observable.combineLatestArray(
            [],
            (values) => ["empty"]
        );
        m.expect(destination).toBeObservable(expected);
    }));
});
