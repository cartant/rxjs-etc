/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { Observable } from "rxjs/Observable";
import { marbles } from "rxjs-marbles";

import "./zipPadded";

describe("observable/zipPadded", () => {

    it("should zip a single observable", marbles((m) => {

        const values = { a: 1, b: 2 };
        const results = { x: [values.a], y: [values.b] };

        const source =   m.cold("a-b--|", values);
        const subs =            "^----!";
        const expected = m.cold("x-y--|", results);

        const destination = Observable.zipPadded([source]);
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should zip multiple observables", marbles((m) => {

        const values = { a: 1, b: 2, c: 3 };
        const results = { x: [values.a, values.c], y: [values.b, undefined] };

        const source1 =  m.cold("a--b--|", values);
        const source2 =  m.cold("-c|", values);
        const subs =            "^-----!";
        const expected = m.cold("-x-y--|", results);

        const destination = Observable.zipPadded<number | undefined>([source1, source2]);
        m.expect(destination).toBeObservable(expected);
        m.expect(source1).toHaveSubscriptions(subs);
        m.expect(source2).toHaveSubscriptions(subs);
    }));

    it("should use the specifed pad value", marbles((m) => {

        const values = { a: 1, b: 2, c: 3 };
        const results = { x: [values.a, values.c], y: [values.b, null] };

        const source1 =  m.cold("a--b--|", values);
        const source2 =  m.cold("-c|", values);
        const subs =            "^-----!";
        const expected = m.cold("-x-y--|", results);

        const destination = Observable.zipPadded<number | null>([source1, source2], null);
        m.expect(destination).toBeObservable(expected);
        m.expect(source1).toHaveSubscriptions(subs);
        m.expect(source2).toHaveSubscriptions(subs);
    }));
});
