/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { defer, Observable, of, timer } from "rxjs";
import { delay, mergeMap, mergeMapTo } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { deferFinalize } from "./deferFinalize";

describe("deferFinalize", () => {

    it("should support asynchonous finalization upon complete", marbles(m => {

        const duration = m.time("--|");

        const source = m.cold("---|");
        const sourceSub =     "^----!";
        const expected =      "-----|";

        const wait = () => of(null).pipe(delay(duration));
        const result = source.pipe(deferFinalize(_ => wait()));
        m.expect(result).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSub);
    }));

    it("should support asynchonous finalization upon error", marbles(m => {

        const duration = m.time("--|");

        const source = m.cold("---#");
        const sourceSub =     "^----!";
        const expected =      "-----#";

        const wait = () => of(null).pipe(delay(duration));
        const result = source.pipe(deferFinalize(_ => wait()));
        m.expect(result).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSub);
    }));

    it("should support asynchonous finalization upon unsubscribe", marbles(m => {

        const duration = m.time("--|");

        const source = m.cold("------");
        const sourceSub =     "^----!";
        const expected =      "----";
        const sub =           "^--!";

        const wait = () => of(null).pipe(delay(duration));
        const result = source.pipe(deferFinalize(_ => wait()));
        m.expect(result, sub).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSub);
    }));
});
