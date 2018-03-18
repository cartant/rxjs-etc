/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { Observable } from "rxjs/Observable";
import { concat } from "rxjs/observable/concat";
import { empty } from "rxjs/observable/empty";
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import { delay } from "rxjs/operators/delay";
import { IScheduler } from "rxjs/Scheduler";
import { marbles } from "rxjs-marbles";
import { page } from "./page";

describe("observable/page", () => {

    const createFactory = (max: number = Infinity, time?: number, scheduler?: IScheduler) =>
        (marker: number | undefined): Observable<{ marker: number, value: Observable<string> }> => {
            const at = (marker === undefined) ? 0 : marker + 1;
            const source = (at <= max) ? of({ marker: at, value: of(at.toString()) }) : empty<never>();
            return (time !== undefined) && (scheduler !== undefined) ?
                source.pipe(delay(time, scheduler)) :
                source;
        };

    it("should complete if there are no pages", marbles((m) => {

        const notifier =  m.hot("--n--|");
        const notifierSubs =    "^----!";
        const expected = m.cold("-----|");

        const factory = createFactory(-1, m.time("-----|"), m.scheduler);
        const paged = page(factory, notifier);
        m.expect(paged).toBeObservable(expected);
        m.expect(notifier).toHaveSubscriptions(notifierSubs);
    }));

    it("should emit the first page", marbles((m) => {

        const notifier =  m.hot("--");
        const expected = m.cold("0-");

        const factory = createFactory();
        const paged = page(factory, notifier);
        m.expect(paged).toBeObservable(expected);
    }));

    it("should further pages in response to the notifier", marbles((m) => {

        const notifier =  m.hot("--n----n--n--");
        const expected = m.cold("0-1----2--3--");

        const factory = createFactory();
        const paged = page(factory, notifier);
        m.expect(paged).toBeObservable(expected);
    }));

    it("should queue notifications", marbles((m) => {

        const notifier =  m.hot("-nn------------");
        const expected = m.cold("----0---1---2--");

        const factory = createFactory(Infinity, m.time("----|"), m.scheduler);
        const paged = page(factory, notifier);
        m.expect(paged).toBeObservable(expected);
    }));

    it("should page without a notifier", marbles((m) => {

        const expected = m.cold("----0---1---2---|");

        const factory = createFactory(2, m.time("----|"), m.scheduler);
        const paged = page(factory);
        m.expect(paged).toBeObservable(expected);
    }));

    it("should page with a consumer", marbles((m) => {

        const other =    m.cold("|");
        const subs = [
                                "----(^!)---------",
                                "--------(^!)-----",
                                "------------(^!)-"
        ];
        const expected = m.cold("----0---1---2---|");

        const factory = createFactory(2, m.time("----|"), m.scheduler);
        const paged = page(factory, source => concat(source, other));
        m.expect(paged).toBeObservable(expected);
        m.expect(other).toHaveSubscriptions(subs);
    }));

    it("should support asynchonous consumers", marbles((m) => {

        const other =    m.cold("----|");
        const subs = [
                                "^---!-------",
                                "----^---!---",
                                "--------^---!"
        ];
        const expected = m.cold("0---1---2---|");

        const factory = createFactory(2);
        const paged = page(factory, source => concat(source, other));
        m.expect(paged).toBeObservable(expected);
        m.expect(other).toHaveSubscriptions(subs);
    }));

    it("should support graphs", marbles((m) => {

        const data = {
            a: {
                d: {},
                e: {}
            },
            b: {
                f: {}
            },
            c: {}
        };
        const expected = m.cold("------(abc)-(def)-|");

        const factory = (marker: any, index: number) => {
            const node = (index === 0) ? data : marker;
            const pairs = Object.keys(node).map(key => ({ marker: node[key], value: of(key) }));
            return from(pairs).pipe(delay(m.time("------|"), m.scheduler));
        };

        const paged = page(factory);
        m.expect(paged).toBeObservable(expected);
    }));
});
