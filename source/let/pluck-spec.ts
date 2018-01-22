/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { marbles } from "rxjs-marbles";
import { pluck } from "./pluck";

describe("let/pluck", () => {

    it("should pluck the specified key", marbles((m) => {

        interface Person { name: string; }

        const source =   m.cold<Person>("-p-|", { p: { name: "alice" } });
        const subs =                    "^--!";
        const expected = m.cold<string>("-n-|", { n: "alice" });

        const destination = source.pipe(pluck("name"));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should pluck the specified nested key", marbles((m) => {

        interface Letters { a: { b: { c: { d: { e: { f: string } } } } }; }

        const source =  m.cold<Letters>("-t-|", { t: { a: { b: { c: { d: { e: { f: "F" } } } } } } });
        const subs =                    "^--!";
        const expected = m.cold<string>("-f-|", { f: "F" });

        const destination = source.pipe(pluck("a", "b", "c", "d", "e", "f"));
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});
