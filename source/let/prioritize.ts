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
import { Subject } from "rxjs/Subject";

export function prioritize<T, R>(
    selector: (prioritized: Observable<T>, deprioritized: Observable<T>) => Observable<T | R>
): (source: Observable<T>) => Observable<T | R> {

    return (source: Observable<T>) => Observable.create((observer: Observer<T | R>) => {

        const connectableSource = publish<T>()(source) as ConnectableObservable<T>;
        const prioritySource = new Subject<T>();
        const prioritySubscription = connectableSource.subscribe(prioritySource);
        const subscription = selector(prioritySource, connectableSource).subscribe(observer);
        subscription.add(prioritySubscription);
        subscription.add(connectableSource.connect());
        return subscription;
    });
}
