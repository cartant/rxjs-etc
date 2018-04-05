/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { AsyncSubject } from "rxjs";
import { concatMap } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { NotificationQueue } from "./NotificationQueue";

describe("NotificationQueue", () => {

    it("should emit nothing without a notification", marbles(m => {

        const notifier =  m.hot("--");
        const queuings = m.cold("q-");
        const expected = m.cold("--");

        const queue = new NotificationQueue(notifier);
        const subscription = queue.connect();

        const result = queuings.pipe(
            concatMap(() => {
                const subject = new AsyncSubject<string>();
                queue.subscribe(
                    index => subject.error(new Error("Unexpected index.")),
                    error => subject.error(error),
                    () => subject.error(new Error("Unexpected completion."))
                );
                return subject;
            })
        );

        m.expect(result).toBeObservable(expected);
    }));

    it("should emit the subscription index upon notification", marbles(m => {

        const notifier =  m.hot("-n");
        const queuings = m.cold("q-");
        const expected = m.cold("-0");

        const queue = new NotificationQueue(notifier);
        const subscription = queue.connect();

        const result = queuings.pipe(
            concatMap(() => {
                const subject = new AsyncSubject<string>();
                queue.subscribe(
                    index => subject.next(index.toString()),
                    error => subject.error(error),
                    () => subject.complete()
                );
                return subject;
            })
        );

        m.expect(result).toBeObservable(expected);
    }));

    it("should emit the subscription index for each notification", marbles(m => {

        const notifier =  m.hot("-----n-n");
        const queuings = m.cold("(qq)----");
        const expected = m.cold("-----0-1");

        const queue = new NotificationQueue(notifier);
        const subscription = queue.connect();

        const result = queuings.pipe(
            concatMap(() => {
                const subject = new AsyncSubject<string>();
                queue.subscribe(
                    index => subject.next(index.toString()),
                    error => subject.error(error),
                    () => subject.complete()
                );
                return subject;
            })
        );

        m.expect(result).toBeObservable(expected);
    }));

    it("should queue notifications", marbles(m => {

        const notifier =  m.hot("(nn)----");
        const queuings = m.cold("-----q-q");
        const expected = m.cold("-----0-1");

        const queue = new NotificationQueue(notifier);
        const subscription = queue.connect();

        const result = queuings.pipe(
            concatMap(() => {
                const subject = new AsyncSubject<string>();
                queue.subscribe(
                    index => subject.next(index.toString()),
                    error => subject.error(error),
                    () => subject.complete()
                );
                return subject;
            })
        );

        m.expect(result).toBeObservable(expected);
    }));
});
