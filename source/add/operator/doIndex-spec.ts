/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { Observable } from "rxjs/Observable";
import { marbles } from "rxjs-marbles";

import "rxjs/add/observable/from";
import "./doIndex";

describe("operator/doIndex", () => {

    it("should mirror multiple values and complete", marbles((m) => {

        const source =   m.cold("--1--2--3--|");
        const subs =            "^----------!";
        const expected = m.cold("--1--2--3--|");

        const destination = source.doIndex(() => {});
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should mirror multiple values and terminate with error", marbles((m) => {

        const source =   m.cold("--1--2--3--#");
        const subs =            "^----------!";
        const expected = m.cold("--1--2--3--#");

        const destination = source.doIndex(() => {});
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should pass the index", () => {

        let seen: any[] = [];

        Observable
            .from(["alice", "bob"])
            .doIndex((value, index) => seen.push({ index, value }))
            .subscribe();

        expect(seen).to.deep.equal([{
            index: 0,
            value: "alice"
        }, {
            index: 1,
            value: "bob"
        }]);
    });

    it("should reset the index for each subscription", () => {

        let seen: any[] = [];

        let observable = Observable
            .from(["alice", "bob"])
            .doIndex((value, index) => seen.push({ index, value }));

        observable.subscribe();
        observable.subscribe();

        expect(seen).to.deep.equal([{
            index: 0,
            value: "alice"
        }, {
            index: 1,
            value: "bob"
        }, {
            index: 0,
            value: "alice"
        }, {
            index: 1,
            value: "bob"
        }]);
    });
});
