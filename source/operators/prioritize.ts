/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    ConnectableObservable,
    MonoTypeOperatorFunction,
    Observable,
    Observer,
    OperatorFunction,
    Subject,
    Subscription
} from "rxjs";

import { publish } from "rxjs/operators";

export function prioritize<T, R>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<R>
): OperatorFunction<T, R>;

export function prioritize<T>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<T>
): MonoTypeOperatorFunction<T>;

export function prioritize<T, R>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<R>
): OperatorFunction<T, R> {

    return (source: Observable<T>) => Observable.create((observer: Observer<R>) => {

        const publishedSource = publish<T>()(source) as ConnectableObservable<T>;
        const prioritizedSource = new Subject<T>();
        const subscription = new Subscription();
        subscription.add(publishedSource.subscribe(prioritizedSource));
        subscription.add(selector(prioritizedSource, publishedSource).subscribe(observer));
        subscription.add(publishedSource.connect());
        return subscription;
    });
}
