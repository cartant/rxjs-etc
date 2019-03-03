/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    ConnectableObservable,
    merge,
    Observable,
    SchedulerLike,
    Subscription,
    timer
} from "rxjs";

import {
    debounce,
    mapTo,
    publish,
    startWith,
    switchMap
} from "rxjs/operators";

import { GenericOperatorFunction } from "../GenericOperatorFunction";

export function debounceTimeWithinReason(
    debounceDuration: number,
    reasonableDuration: number,
    scheduler?: SchedulerLike
): GenericOperatorFunction {

    return <T>(source: Observable<T>) => source.pipe(
        publish(sharedSource => new Observable<T>(observer => {

            let reasonableTimer: ConnectableObservable<number>;

            const debounced = sharedSource.pipe(
                debounce(() => merge(
                    timer(debounceDuration, scheduler),
                    reasonableTimer
                ))
            );

            reasonableTimer = debounced.pipe(
                mapTo(undefined),
                startWith(undefined),
                switchMap(() => timer(reasonableDuration, scheduler)),
                publish()
            ) as ConnectableObservable<number>;

            const subscription = new Subscription();
            subscription.add(reasonableTimer.connect());
            subscription.add(debounced.subscribe(observer));
            return subscription;
        })
    ));
}
