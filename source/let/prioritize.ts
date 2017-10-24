/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { publish } from "rxjs/operators/publish";
import { share } from "rxjs/operators/share";

export function prioritize<T, R>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<T | R>
): (source: Observable<T>) => Observable<T | R> {

    return (source: Observable<T>) => Observable.create((observer: Observer<T | R>) => {

        const sharedSource = share<T>()(source);
        const connectableSource = publish<T>()(sharedSource) as ConnectableObservable<T>;
        const subscription = selector(sharedSource, connectableSource).subscribe(observer);
        subscription.add(connectableSource.connect());
        return subscription;
    });
}
