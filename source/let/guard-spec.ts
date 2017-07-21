/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { marbles } from "rxjs-marbles";
import { guard } from "./guard";

import "rxjs/add/operator/let";

describe("guard", () => {

    it("should not reject value that pass the guard", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: 3
        };

        const source =   m.cold("-a-b-c-|", values);
        const subs =            "^------!";
        const expected = m.cold("-a-b-c-|", values);

        const destination = source.let(guard((value): value is number => typeof value === "number"));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should reject value that fail the guard", marbles((m) => {

        const values = {
            a: 1,
            b: 2,
            c: "three"
        };

        const source =   m.cold("-a-b-c-|", values);
        const subs =            "^----!";
        const expected = m.cold("-a-b-#", values, new Error("Guard rejection."));

        const destination = source.let(guard((value): value is number => typeof value === "number"));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
