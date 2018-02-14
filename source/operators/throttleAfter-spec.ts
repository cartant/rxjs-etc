/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { marbles } from "rxjs-marbles";
import { throttleAfter } from "./throttleAfter";

describe("throttleAfter", () => {

    it("should throttle after the notifier emits", marbles((m) => {

        const source =   m.cold("ab-cd---ef-g-----h--|");
        const sourceSubs =      "^-------------------!";
        const notifier = m.cold("--n----n--n---------|");
        const notifierSubs =    "^-------------------!";
        const expected = m.cold("ab-c----e--------h--|");

        const period = m.time("----|");
        const destination = source.pipe(throttleAfter(notifier, period, m.scheduler));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSubs);
        m.expect(notifier).toHaveSubscriptions(notifierSubs);
    }));
});
