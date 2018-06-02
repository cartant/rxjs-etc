/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    asapScheduler,
    ConnectableObservable,
    merge,
    MonoTypeOperatorFunction,
    Observable,
    SchedulerLike,
    Subscription,
    timer
} from "rxjs";

import { debounce, publish, startWith, switchMap } from "rxjs/operators";

export function debounceTimeWithinReason<T>(
    debounceDuration: number,
    reasonableDuration: number,
    scheduler: SchedulerLike = asapScheduler
): MonoTypeOperatorFunction<T> {

    return source => source.pipe(publish(sharedSource => new Observable<T>(observer => {

        let reasonableTimer: ConnectableObservable<T>;

        const debounced = sharedSource.pipe(
            debounce(() => merge(
                timer(debounceDuration, scheduler),
                reasonableTimer
            ))
        );

        reasonableTimer = debounced.pipe(
            startWith<T>(undefined!),
            switchMap(() => timer(reasonableDuration, scheduler)),
            publish()
        ) as ConnectableObservable<T>;

        const subscription = new Subscription();
        subscription.add(reasonableTimer.connect());
        subscription.add(debounced.subscribe(observer));
        return subscription;
    })));
}
