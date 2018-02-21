/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { of } from "rxjs/observable/of";
import { Action } from "rxjs/scheduler/Action";
import { IScheduler } from "rxjs/Scheduler";
import { Subscription } from "rxjs/Subscription";
import { marbles } from "rxjs-marbles";
import { reschedule } from "./reschedule";

describe("reschedule", () => {

    it("should reschedule to emit using the specified scheduler", marbles((m) => {

        class MoreDelayScheduler implements IScheduler {
            constructor(private moreDelay: number) {}
            public now(): number {
                return m.scheduler.now();
            }
            public schedule<T>(work: (this: Action<T>, state?: T) => void, delay: number = 0, state?: T): Subscription {
                return m.scheduler.schedule(work, delay + this.moreDelay, state);
            }
        }

        const source = of("a", "b", "c", m.scheduler);
        const expected = m.cold("--a-b-(c|)");

        const destination = source.pipe(reschedule(new MoreDelayScheduler(m.time("--|"))));
        m.expect(destination).toBeObservable(expected);
    }));
});
