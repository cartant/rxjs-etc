/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { mergeMapTo } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { shareReplay } from "./shareReplay";

describe("shareReplay", () => {

    it("should unsubscribe on a ref count of zero", marbles(m => {

        const source =     m.cold("-1-2-3----4--");
        const sourceSubs =        "^-----------!";

        const published = source.pipe(shareReplay(1));

        const subscriber1 = m.hot("a|           ").pipe(mergeMapTo(published));
        const expected1 =         "-1-2-3----4--";
        const subscriber2 = m.hot("----b|       ").pipe(mergeMapTo(published));
        const expected2 =         "----23----4--";
        const subscriber3 = m.hot("--------c|   ").pipe(mergeMapTo(published));
        const expected3 =         "--------3-4--";
        const unsub =             "------------!";

        m.expect(subscriber1, unsub).toBeObservable(expected1);
        m.expect(subscriber2, unsub).toBeObservable(expected2);
        m.expect(subscriber3, unsub).toBeObservable(expected3);
        m.expect(source).toHaveSubscriptions(sourceSubs);
    }));
});
