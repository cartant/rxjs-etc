/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    concat,
    from,
    identity,
    MonoTypeOperatorFunction,
    Observable,
    ObservableInput,
    of,
    OperatorFunction,
    Subject
} from "rxjs";

import { expand, ignoreElements, mergeMap, tap } from "rxjs/operators";
import { NotificationQueue } from "./NotificationQueue";
import { isObservable } from "../util";

export type TraverseElement<T, M> = { markers: ObservableInput<M>, values: ObservableInput<T> };
export type TraverseFactory<T, M> = (marker: M | undefined, index: number) => Observable<TraverseElement<T, M>>;

export function traverse<T, M>(
    factory: TraverseFactory<T, M>,
    notifier: Observable<any>,
    concurrency?: number
): Observable<T>;

export function traverse<T, M, R>(
    factory: TraverseFactory<T, M>,
    operator: OperatorFunction<T, R>,
    concurrency?: number
): Observable<R>;

export function traverse<T, M>(
    factory: TraverseFactory<T, M>,
    concurrency?: number
): Observable<T>;

export function traverse<T, M, R>(
    factory: TraverseFactory<T, M>,
    optionalNotifierOrOperatorOrConcurrency?: Observable<any> | OperatorFunction<T, R> | number,
    optionalConcurrency?: number
): Observable<T | R> {
    return new Observable<T | R>(observer => {

        let concurrency: number;
        let operator: OperatorFunction<T, T | R>;
        let queue: NotificationQueue;
        let queueOperator: MonoTypeOperatorFunction<M | undefined>;

        if (isObservable(optionalNotifierOrOperatorOrConcurrency)) {
            operator = identity;
            queue = new NotificationQueue(optionalNotifierOrOperatorOrConcurrency);
            queueOperator = identity;
        } else {
            const subject = new Subject<any>();
            if (typeof optionalNotifierOrOperatorOrConcurrency === "function") {
                operator = optionalNotifierOrOperatorOrConcurrency;
            } else {
                operator = identity;
            }
            queue = new NotificationQueue(subject);
            queueOperator = markers => { subject.next(); return markers; };
        }

        if (typeof optionalConcurrency === "number") {
            concurrency = optionalConcurrency;
        } else if (typeof optionalNotifierOrOperatorOrConcurrency === "number") {
            concurrency = optionalNotifierOrOperatorOrConcurrency;
        } else {
            concurrency = 1;
        }

        const destination = new Subject<T | R>();
        const subscription = destination.subscribe(observer);
        subscription.add(queue.connect());
        subscription.add(of(undefined).pipe(
            expand((marker: M | undefined) => queue.pipe(
                mergeMap(index => factory(marker, index).pipe(
                    mergeMap(({ markers, values }) => concat(
                        from<T>(values).pipe(
                            operator,
                            tap(value => destination.next(value)),
                            ignoreElements()
                        ) as Observable<never>,
                        from<M>(markers)
                    ))
                )),
                queueOperator
            ), concurrency)
        ).subscribe({
            complete: () => destination.complete(),
            error: error => destination.error(error)
        }));
        return subscription;
    });
}
