/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { marbles } from "rxjs-marbles";
import { latch } from "./latch";

describe("latch", () => {

    it("should pass notifications only when latched", marbles(m => {

        const source =   m.hot("ab-cd-ef-gh");
        const sourceSubs = [
                               "--^--!-----",
                               "--------^--"
        ];
        const notifier = m.hot("--x--x--x--");
        const expected =       "---cd----gh";

        const destination = source.pipe(latch(notifier));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSubs);
    }));
});
