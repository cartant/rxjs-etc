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
    Observer,
    of,
    OperatorFunction,
    Subject,
    Subscription
} from "rxjs";

import { expand, ignoreElements, mergeMap, tap } from "rxjs/operators";
import { NotificationQueue } from "./NotificationQueue";
import { isObservable } from "../util";

const nextSymbol = Symbol("next");

export type TraverseConsumer<T, R> = (source: Observable<T>) => Observable<R>;
export type TraverseElement<T, M> = { markers: ObservableInput<M>, values: ObservableInput<T> };
export type TraverseProducer<T, M> = (marker: M | undefined, index: number) => Observable<TraverseElement<T, M>>;

export function traverse<T, M>(
    producer: TraverseProducer<T, M>,
    notifier: Observable<any>
): Observable<T>;

export function traverse<T, M, R>(
    producer: TraverseProducer<T, M>,
    consumer: TraverseConsumer<T, R>
): Observable<R>;

export function traverse<T, M>(
    producer: TraverseProducer<T, M>
): Observable<T>;

export function traverse<T, M, R>(
    producer: TraverseProducer<T, M>,
    notifierOrConsumer?: Observable<any> | TraverseConsumer<T, R>
): Observable<T | R> {
    return Observable.create((observer: Observer<T | R>) => {

        let consumerOperator: OperatorFunction<T, T | R>;
        let producerOperator: MonoTypeOperatorFunction<M | undefined>;
        let queue: NotificationQueue;

        if (isObservable(notifierOrConsumer)) {
            consumerOperator = identity;
            producerOperator = identity;
            queue = new NotificationQueue(notifierOrConsumer);
        } else {
            const subject = new Subject<any>();
            consumerOperator = notifierOrConsumer || identity;
            producerOperator = source => { subject.next(); return source; };
            queue = new NotificationQueue(subject);
        }

        const concurrency = 1;
        const destination = new Subject<T | R>();
        const subscription = destination.subscribe(observer);
        subscription.add(queue.connect());
        subscription.add(of(undefined).pipe(
            expand((marker: M | undefined) => producerOperator(queue.pipe(
                mergeMap(index => producer(marker, index).pipe(
                    mergeMap(({ markers, values }) => concat(
                        from<T>(values).pipe(
                            consumerOperator,
                            tap(value => destination.next(value)),
                            ignoreElements()
                        ) as Observable<never>,
                        from<M>(markers)
                    ))
                ))
            )), concurrency)
        ).subscribe(
            () => {},
            error => destination.error(error),
            () => destination.complete()
        ));
        return subscription;
    });
}
