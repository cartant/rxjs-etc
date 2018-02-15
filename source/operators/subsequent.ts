/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { concat } from "rxjs/observable/concat";
import { publish } from "rxjs/operators/publish";
import { take } from "rxjs/operators/take";

export function subsequent<T>(
    count: number,
    selector: (source: Observable<T>) => Observable<T>
): (source: Observable<T>) => Observable<T>;

export function subsequent<T>(
    selector: (source: Observable<T>) => Observable<T>
): (source: Observable<T>) => Observable<T>;

export function subsequent<T>(
    countOrSelector: number | ((source: Observable<T>) => Observable<T>),
    selector?: (source: Observable<T>) => Observable<T>
): (source: Observable<T>) => Observable<T> {

    let count: number;
    if (typeof countOrSelector === "number") {
        count = countOrSelector;
    } else {
        count = 1;
        selector = countOrSelector;
    }

    return (source: Observable<T>) => Observable.create((observer: Observer<T>) => {
        const published = source.pipe(publish()) as ConnectableObservable<T>;
        const subscription = concat(
            published.pipe(take(count)),
            selector!(published)
        ).subscribe(observer);
        subscription.add(published.connect());
        return subscription;
    });
}
