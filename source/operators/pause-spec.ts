/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { marbles } from "rxjs-marbles";
import { pause } from "./pause";

describe("pause", () => {

    it("should pause and resume", marbles(m => {

        const source =   m.cold("ab-----c-d-e----|");
        const notifier = m.cold("--f-----t---f----", { f: false, t: true });
        const expected =        "--(ab)-c----(de)|";

        const result = source.pipe(pause(notifier, true));
        m.expect(result).toBeObservable(expected);
    }));

    it("should pause complete notifications", marbles(m => {

        const source =   m.cold("ab|-----");
        const notifier = m.cold("---f----", { f: false, t: true });
        const expected =        "---(ab|)";

        const result = source.pipe(pause(notifier, true));
        m.expect(result).toBeObservable(expected);
    }));

    it("should not pause error notifications", marbles(m => {

        const source =   m.cold("ab#-----");
        const notifier = m.cold("---f----", { f: false, t: true });
        const expected =        "--#";

        const result = source.pipe(pause(notifier, true));
        m.expect(result).toBeObservable(expected);
    }));
});
