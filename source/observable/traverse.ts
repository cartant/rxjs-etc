/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { UnaryFunction } from "rxjs/interfaces";
import { Observable, ObservableInput } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { from } from "rxjs/observable/from";
import { concatMap } from "rxjs/operators/concatMap";
import { expand } from "rxjs/operators/expand";
import { finalize } from "rxjs/operators/finalize";
import { mergeMap } from "rxjs/operators/mergeMap";
import { toArray } from "rxjs/operators/toArray";
import { pipeFromArray } from "rxjs/util/pipe";
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

        let notifier: Observable<any>;
        let producerWithPreExpandOperators: TraverseProducer<T, M>;
        let postExpandOperators: UnaryFunction<any, any>[];
        if (isObservable(notifierOrConsumer)) {
            notifier = notifierOrConsumer;
            producerWithPreExpandOperators = producer;
            postExpandOperators = [
                concatMap(({ values }) => from(values))
            ];
        } else {
            const subject = new Subject<any>();
            notifier = subject;
            producerWithPreExpandOperators = (marker: M | undefined, index: number) => producer(marker, index).pipe(
                toArray(),
                concatMap(produced => {
                    const length = produced.length;
                    if (length) {
                        produced[length - 1][nextSymbol] = () => subject.next();
                    } else {
                        subject.next();
                    }
                    return produced;
                })
            );
            postExpandOperators = [
                concatMap(({ [nextSymbol]: next, values }) => from<T>(values).pipe(
                    notifierOrConsumer || defaultConsumer,
                    finalize(() => next && next())
                ))
            ];
        }

        const concurrency = 1;
        const queue = new NotificationQueue(notifier);
        const subscription = new Subscription();
        subscription.add(queue.connect());
        subscription.add(producerWithPreExpandOperators(undefined, 0).pipe(
            expand(({ markers }) => from<M>(markers).pipe(
                mergeMap(marker => queue.pipe(
                    concatMap(index => producerWithPreExpandOperators(marker, index + 1))
                ), concurrency)
            )),
            pipeFromArray(postExpandOperators) as UnaryFunction<Observable<any>, Observable<T | R>>
        ).subscribe(observer));
        return subscription;
    });
}

function defaultConsumer<T>(source: Observable<T>): Observable<any> {
    return source;
}
