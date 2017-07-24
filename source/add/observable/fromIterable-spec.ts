/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { Observable } from "rxjs/Observable";
import { marbles } from "rxjs-marbles";

import "./fromIterable";

describe("observable/fromIterable", () => {

    it("should accept an iterable", marbles((m) => {

        const map = new Map<string, number>();
        map.set("a", 1);
        map.set("b", 2);
        map.set("c", 3);

        const expected = m.cold("(abc|)");

        const destination = Observable.fromIterable(map.keys());
        m.expect(destination).toBeObservable(expected);
    }));
});
