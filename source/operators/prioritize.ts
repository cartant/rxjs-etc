/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { publish } from "rxjs/operators/publish";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

export function prioritize<T, R>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<T | R>
): (source: Observable<T>) => Observable<T | R>;

export function prioritize<T>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<T>
): (source: Observable<T>) => Observable<T>;

export function prioritize<T, R>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<T | R>
): (source: Observable<T>) => Observable<T | R> {

    return (source: Observable<T>) => Observable.create((observer: Observer<T | R>) => {

        const publishedSource = publish<T>()(source) as ConnectableObservable<T>;
        const prioritizedSource = new Subject<T>();
        const subscription = new Subscription();
        subscription.add(publishedSource.subscribe(prioritizedSource));
        subscription.add(selector(prioritizedSource, publishedSource).subscribe(observer));
        subscription.add(publishedSource.connect());
        return subscription;
    });
}
