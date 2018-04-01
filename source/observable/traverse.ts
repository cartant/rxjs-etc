/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, ObservableInput } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { concat } from "rxjs/observable/concat";
import { from } from "rxjs/observable/from";
import { concatMap } from "rxjs/operators/concatMap";
import { expand } from "rxjs/operators/expand";
import { ignoreElements } from "rxjs/operators/ignoreElements";
import { tap } from "rxjs/operators/tap";
import { identity } from "rxjs/util/identity";
import { NotificationQueue } from "./NotificationQueue";
import { isObservable } from "../util";

const nextSymbol = Symbol.for("next");

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

        let consumerOperation: (source: Observable<T>) => Observable<T | R>;
        let producerOperation: (source: Observable<M>) => Observable<M>;
        let queue: NotificationQueue;

        if (isObservable(notifierOrConsumer)) {
            consumerOperation = identity;
            producerOperation = identity;
            queue = new NotificationQueue(notifierOrConsumer);
        } else {
            const subject = new Subject<any>();
            consumerOperation = notifierOrConsumer || identity;
            producerOperation = tap<M>(() => subject.next());
            queue = new NotificationQueue(subject);
        }

        const destination = new Subject<T | R>();
        const subscription = new Subscription();
        subscription.add(destination.subscribe(observer));
        subscription.add(queue.connect());
        subscription.add(producer(undefined, 0).pipe(
            expand(({ markers, values }, index) => concat(
                from<T>(values).pipe(
                    consumerOperation,
                    tap(value => destination.next(value)),
                    ignoreElements()
                ),
                from<M>(markers).pipe(
                    producerOperation,
                    concatMap(marker => queue.pipe(
                        concatMap(index => producer(marker, index + 1))
                    ))
                )
            )),
            tap(
                () => {},
                error => destination.error(error),
                () => destination.complete()
            )
        ).subscribe());
        return subscription;
    });
}
