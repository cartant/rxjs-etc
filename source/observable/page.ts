/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, ObservableInput } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { defer } from "rxjs/observable/defer";
import { empty } from "rxjs/observable/empty";
import { from } from "rxjs/observable/from";
import { concatMap } from "rxjs/operators/concatMap";
import { expand } from "rxjs/operators/expand";
import { take } from "rxjs/operators/take";
import { tap } from "rxjs/operators/tap";
import { pipeFromArray } from "rxjs/util/pipe";
import { isObservable } from "../util";

export type PageConsumer<T, R> = (source: Observable<T>) => Observable<R>;
export type PageFactory<T, M> = (marker: M | undefined, index: number) => Observable<{ marker: M, value: ObservableInput<T> }>;

export function page<T, M>(
    factory: PageFactory<T, M>,
    notifier: Observable<any>
): Observable<T>;

export function page<T, M, R>(
    factory: PageFactory<T, M>,
    consumer: PageConsumer<T, R>
): Observable<R>;

export function page<T, M>(
    factory: PageFactory<T, M>
): Observable<T>;

export function page<T, M, R>(
    factory: PageFactory<T, M>,
    notifierOrConsumer?: Observable<any> | PageConsumer<T, R>
): Observable<T | R> {
    return Observable.create((observer: Observer<T | R>) => {
        let notifier: Observable<any>;
        let operators: any[];
        if (isObservable(notifierOrConsumer)) {
            notifier = notifierOrConsumer;
            operators = [];
        } else {
            const subject = new Subject<any>();
            notifier = subject;
            operators = [tap(undefined!, undefined!, () => subject.next())];
            if (notifierOrConsumer !== undefined) {
                operators.unshift(notifierOrConsumer);
            }
        }
        let index = 0;
        let notifications = 0;
        const subscription = new Subscription();
        subscription.add(notifier.subscribe(() => ++notifications));
        subscription.add(factory(undefined, index).pipe(
            expand(({ marker, value }) => {
                const more = defer(() => {
                    --notifications;
                    return factory(marker, ++index);
                });
                if (notifications > 0) {
                    return more;
                }
                return notifier.pipe(
                    take(1),
                    concatMap(() => more)
                );
            }),
            concatMap(({ value }) => from(value).pipe<T | R>(pipeFromArray(operators)))
        ).subscribe(observer));
        return subscription;
    });
}
