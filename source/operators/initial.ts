/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    ConnectableObservable,
    merge,
    MonoTypeOperatorFunction,
    Observable,
    OperatorFunction
} from "rxjs/";

import { publish, skip, take } from "rxjs/operators";

export function initial<T, R>(
    count: number,
    operator: (source: Observable<T>) => Observable<R>
): OperatorFunction<T, T | R>;

export function initial<T>(
    count: number,
    operator: (source: Observable<T>) => Observable<T>
): MonoTypeOperatorFunction<T>;

export function initial<T, R>(
    operator: (source: Observable<T>) => Observable<R>
): OperatorFunction<T, T | R>;

export function initial<T>(
    operator: (source: Observable<T>) => Observable<T>
): MonoTypeOperatorFunction<T>;

export function initial<T, R>(
    countOrOperator: number | ((source: Observable<T>) => Observable<R>),
    operator?: (source: Observable<T>) => Observable<R>
): OperatorFunction<T, T | R> {

    let count: number;
    if (typeof countOrOperator === "number") {
        count = countOrOperator;
    } else {
        count = 1;
        operator = countOrOperator;
    }

    return (source: Observable<T>) => new Observable<T | R>(observer => {
        const published = source.pipe(publish()) as ConnectableObservable<T>;
        const subscription = merge(
            published.pipe(take(count), operator!),
            published.pipe(skip(count))
        ).subscribe(observer);
        subscription.add(published.connect());
        return subscription;
    });
}
