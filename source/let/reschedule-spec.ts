/**
 * @license Copyright © 2018 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { of } from "rxjs/observable/of";
import { asap } from "rxjs/scheduler/asap";
import { marbles } from "rxjs-marbles";
import { reschedule } from "./reschedule";

describe("let/reschedule", () => {

    it("should reschedule to emit using the specified scheduler", marbles((m) => {

        const source = of("a", "b", "c", asap);
        const expected = m.cold("(abc|)");

        const destination = source.pipe(reschedule(m.scheduler));
        m.expect(destination).toBeObservable(expected);
    }));
});
