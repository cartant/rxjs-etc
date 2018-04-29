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

export type TraverseConsumer<T, R> = (values: Observable<T>) => Observable<R>;
export type TraverseElement<T, M> = { markers: ObservableInput<M>, values: ObservableInput<T> };
export type TraverseProducer<T, M> = (marker: M | undefined, index: number) => Observable<TraverseElement<T, M>>;

export function traverse<T, M>(
    producer: TraverseProducer<T, M>,
    notifier: Observable<any>,
    concurrency?: number
): Observable<T>;

export function traverse<T, M, R>(
    producer: TraverseProducer<T, M>,
    consumer: TraverseConsumer<T, R>,
    concurrency?: number
): Observable<R>;

export function traverse<T, M>(
    producer: TraverseProducer<T, M>,
    concurrency?: number
): Observable<T>;

export function traverse<T, M, R>(
    producer: TraverseProducer<T, M>,
    optionalNotifierOrConsumerOrConcurrency?: Observable<any> | TraverseConsumer<T, R> | number,
    optionalConcurrency?: number
): Observable<T | R> {
    return new Observable<T | R>(observer => {

        let concurrency: number;
        let consumerOperator: OperatorFunction<T, T | R>;
        let producerOperator: MonoTypeOperatorFunction<M | undefined>;
        let queue: NotificationQueue;

        if (isObservable(optionalNotifierOrConsumerOrConcurrency)) {
            consumerOperator = identity;
            producerOperator = identity;
            queue = new NotificationQueue(optionalNotifierOrConsumerOrConcurrency);
        } else {
            const subject = new Subject<any>();
            if (typeof optionalNotifierOrConsumerOrConcurrency === "function") {
                consumerOperator = optionalNotifierOrConsumerOrConcurrency;
            } else {
                consumerOperator = identity;
            }
            producerOperator = markers => { subject.next(); return markers; };
            queue = new NotificationQueue(subject);
        }

        if (typeof optionalConcurrency === "number") {
            concurrency = optionalConcurrency;
        } else if (typeof optionalNotifierOrConsumerOrConcurrency === "number") {
            concurrency = optionalNotifierOrConsumerOrConcurrency;
        } else {
            concurrency = 1;
        }

        const destination = new Subject<T | R>();
        const subscription = destination.subscribe(observer);
        subscription.add(queue.connect());
        subscription.add(of(undefined).pipe(
            expand((marker: M | undefined) => queue.pipe(
                mergeMap(index => producer(marker, index).pipe(
                    mergeMap(({ markers, values }) => concat(
                        from<T>(values).pipe(
                            consumerOperator,
                            tap(value => destination.next(value)),
                            ignoreElements()
                        ) as Observable<never>,
                        from<M>(markers)
                    ))
                )),
                producerOperator
            ), concurrency)
        ).subscribe({
            complete: () => destination.complete(),
            error: error => destination.error(error)
        }));
        return subscription;
    });
}
