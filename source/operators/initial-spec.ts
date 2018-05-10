/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { delay } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { initial } from "./initial";

describe("initial", () => {

    it("should debounce only initial notifications", marbles((m) => {

        const source =   m.cold("abc---d|");
        const sourceSubs =      "^------!";
        const expected = m.cold("-bca--d|");

        const duration = m.time("---|");
        const destination = source.pipe(initial(s => s.pipe(delay(duration, m.scheduler))));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSubs);
    }));

    it("should support count", marbles((m) => {

        const source =   m.cold("abc---d|");
        const sourceSubs =      "^------!";
        const expected = m.cold("--cab-d|");

        const duration = m.time("---|");
        const destination = source.pipe(initial(2, s => s.pipe(delay(duration, m.scheduler))));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSubs);
    }));
});
