/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { Observable } from "rxjs/Observable";
import { marbles } from "rxjs-marbles";

import "./concatArray";

describe("observable/concatArray", () => {

    it("should concat a single observable", marbles((m) => {

        const source =   m.cold("a----|");
        const subs =            "^----!";
        const expected = m.cold("a----|");

        const destination = Observable.concatArray([source]);
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should concat multiple observables", marbles((m) => {

        const source1 =  m.cold("a--|");
        const subs1 =           "^--!";
        const source2 =     m.cold("b----|");
        const subs2 =           "---^----!";
        const expected = m.cold("a--b----|");

        const destination = Observable.concatArray([source1, source2]);
        m.expect(destination).toBeObservable(expected);
        m.expect(source1).toHaveSubscriptions(subs1);
        m.expect(source2).toHaveSubscriptions(subs2);
    }));

    it("should complete when observables is empty", marbles((m) => {

        const expected = m.cold("|");

        const destination = Observable.concatArray([]);
        m.expect(destination).toBeObservable(expected);
    }));
});
