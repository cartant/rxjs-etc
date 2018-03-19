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
import { merge } from "rxjs/observable/merge";
import { delay } from "rxjs/operators/delay";
import { IScheduler } from "rxjs/Scheduler";
import { marbles } from "rxjs-marbles";
import { traverse } from "./traverse";

describe("observable/traverse", () => {

    const createProducer = (max: number = Infinity, time?: number, scheduler?: IScheduler) =>
        (marker: number | undefined): Observable<{ marker: number, value: Observable<string> }> => {
            const at = (marker === undefined) ? 0 : marker + 1;
            const source = (at <= max) ? of({ marker: at, value: of(at.toString()) }) : empty<never>();
            return (time !== undefined) && (scheduler !== undefined) ?
                source.pipe(delay(time, scheduler)) :
                source;
        };

    it("should complete if there is no data", marbles((m) => {

        const notifier =  m.hot("--n--|");
        const notifierSubs =    "^----!";
        const expected = m.cold("-----|");

        const producer = createProducer(-1, m.time("-----|"), m.scheduler);
        const traversed = traverse(producer, notifier);
        m.expect(traversed).toBeObservable(expected);
        m.expect(notifier).toHaveSubscriptions(notifierSubs);
    }));

    it("should traverse the first chunk of data", marbles((m) => {

        const notifier =  m.hot("--");
        const expected = m.cold("0-");

        const producer = createProducer();
        const traversed = traverse(producer, notifier);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should traverse further chunks in response to the notifier", marbles((m) => {

        const notifier =  m.hot("--n----n--n--");
        const expected = m.cold("0-1----2--3--");

        const producer = createProducer();
        const traversed = traverse(producer, notifier);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should queue notifications", marbles((m) => {

        const notifier =  m.hot("-nn------------");
        const expected = m.cold("----0---1---2--");

        const producer = createProducer(Infinity, m.time("----|"), m.scheduler);
        const traversed = traverse(producer, notifier);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should traverse without a notifier", marbles((m) => {

        const expected = m.cold("----0---1---2---|");

        const producer = createProducer(2, m.time("----|"), m.scheduler);
        const traversed = traverse(producer);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should traverse with a consumer", marbles((m) => {

        const other =    m.cold("|");
        const subs = [
                                "----(^!)---------",
                                "--------(^!)-----",
                                "------------(^!)-"
        ];
        const expected = m.cold("----0---1---2---|");

        const producer = createProducer(2, m.time("----|"), m.scheduler);
        const traversed = traverse(producer, source => concat(source, other));
        m.expect(traversed).toBeObservable(expected);
        m.expect(other).toHaveSubscriptions(subs);
    }));

    it("should traverse with asynchonous consumers", marbles((m) => {

        const other =    m.cold("----|");
        const subs = [
                                "^---!-------",
                                "----^---!---",
                                "--------^---!"
        ];
        const expected = m.cold("0---1---2---|");

        const producer = createProducer(2);
        const traversed = traverse(producer, source => concat(source, other));
        m.expect(traversed).toBeObservable(expected);
        m.expect(other).toHaveSubscriptions(subs);
    }));

    it("should traverse graphs with a notifier", marbles((m) => {

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

        const notifier =  m.hot("------n-----n--");
        const expected = m.cold("(abc)-(de)--f--");

        const producer = (marker: any, index: number) => {
            const node = (index === 0) ? data : marker;
            const pairs = Object.keys(node).map(key => ({ marker: node[key], value: of(key) }));
            return from(pairs);
        };

        const traversed = traverse(producer, notifier);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should serialize production", marbles((m) => {

        const values = {
            x: { marker: undefined, value: ["a", "b"] },
            y: { marker: undefined, value: ["c", "d"] },
            z: { marker: undefined, value: ["e", "f"] }
        };

        const x = m.cold("x----|", values);
        const y = m.cold("y----|", values);
        const z = m.cold("z----|", values);

        const expected = m.cold("-----(ab)-(cd)-(ef|)");
        const xSubs =           "^----!--------------";
        const ySubs =           "-----^----!---------";
        const zSubs =           "----------^----!----";

        const producer = (marker: any, index: number) => {
            switch (index) {
            case 0:
                return x;
            case 1:
                return y;
            case 2:
                return z;
            default:
                return empty<never>();
            }
        };

        const traversed = traverse(producer);
        m.expect(traversed).toBeObservable(expected);
        m.expect(x).toHaveSubscriptions(xSubs);
        m.expect(y).toHaveSubscriptions(ySubs);
        m.expect(z).toHaveSubscriptions(zSubs);
    }));

    it("should queue notifications for graphs", marbles((m) => {

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

        const notifier =  m.hot("nn-----------------");
        const expected = m.cold("------(abc)-(def)--");

        const producer = (marker: any, index: number) => {
            const node = (index === 0) ? data : marker;
            const pairs = Object.keys(node).map(key => ({ marker: node[key], value: of(key) }));
            return pairs.length ?
                from(pairs).pipe(delay(m.time("------|"), m.scheduler)) :
                empty<never>();
        };

        const traversed = traverse(producer, notifier);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should traverse graphs without a notifier", marbles((m) => {

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

        const expected = m.cold("------(abc)-(de)--(f|)");

        const producer = (marker: any, index: number) => {
            const node = (index === 0) ? data : marker;
            const pairs = Object.keys(node).map(key => ({ marker: node[key], value: of(key) }));
            return pairs.length ?
                from(pairs).pipe(delay(m.time("------|"), m.scheduler)) :
                empty<never>();
        };

        const traversed = traverse(producer);
        m.expect(traversed).toBeObservable(expected);
    }));

    it("should preserve the order", marbles((m) => {

        const expected = m.cold("------a-b---(c|)");

        const producer = (marker: any, index: number) => {
            return (index === 0) ? merge(
                of({ marker: undefined, value: of("a").pipe(delay(m.time("------|"), m.scheduler)) }),
                of({ marker: undefined, value: of("b").pipe(delay(m.time("--|"), m.scheduler)) }),
                of({ marker: undefined, value: of("c").pipe(delay(m.time("----|"), m.scheduler)) })
            ) : empty<never>();
        };

        const traversed = traverse(producer);
        m.expect(traversed).toBeObservable(expected);
    }));
});
