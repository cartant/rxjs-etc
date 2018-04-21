/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    concat,
    ConnectableObservable,
    MonoTypeOperatorFunction,
    Observable,
    Observer,
    OperatorFunction
} from "rxjs/";

import { publish, take } from "rxjs/operators";

export function subsequent<T, R>(
    count: number,
    selector: (source: Observable<T>) => Observable<R>
): OperatorFunction<T, T | R>;

export function subsequent<T>(
    count: number,
    selector: (source: Observable<T>) => Observable<T>
): MonoTypeOperatorFunction<T>;

export function subsequent<T, R>(
    selector: (source: Observable<T>) => Observable<R>
): OperatorFunction<T, T | R>;

export function subsequent<T>(
    selector: (source: Observable<T>) => Observable<T>
): MonoTypeOperatorFunction<T>;

export function subsequent<T, R>(
    countOrSelector: number | ((source: Observable<T>) => Observable<R>),
    selector?: (source: Observable<T>) => Observable<R>
): OperatorFunction<T, T | R> {

    let count: number;
    if (typeof countOrSelector === "number") {
        count = countOrSelector;
    } else {
        count = 1;
        selector = countOrSelector;
    }

    return (source: Observable<T>) => Observable.create((observer: Observer<T | R>) => {
        const published = source.pipe(publish()) as ConnectableObservable<T>;
        const subscription = concat(
            published.pipe(take(count)),
            selector!(published)
        ).subscribe(observer);
        subscription.add(published.connect());
        return subscription;
    });
}
