/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { concat } from "rxjs/observable/concat";
import { of } from "rxjs/observable/of";
import { concatMap } from "rxjs/operator/concatMap";
import { delay } from "rxjs/operator/delay";
import { distinctUntilChanged } from "rxjs/operator/distinctUntilChanged";
import { filter } from "rxjs/operator/filter";
import { publish } from "rxjs/operator/publish";
import { startWith } from "rxjs/operator/startWith";
import { switchMap } from "rxjs/operator/switchMap";
import { take } from "rxjs/operator/take";
import { takeUntil } from "rxjs/operator/takeUntil";
import { IScheduler } from "rxjs/Scheduler";

export function throttleAfter<T>(
    notifier: Observable<any>,
    duration: number,
    scheduler?: IScheduler
): (source: Observable<T>) => Observable<T> {

    return (source) => publish.call(source, (sharedSource: Observable<T>) => {

        // Until this is merged, the selector passed to publish cannot change the type:
        // https://github.com/ReactiveX/rxjs/pull/2616

        const switched = switchMap.call(notifier, () => concat(
            of(true),
            delay.call(of(false), duration, scheduler)
        ));
        const started = startWith.call(switched, false);
        const signal = distinctUntilChanged.call(started);

        return publish.call(signal, (sharedSignal: Observable<boolean>) => concatMap.call(
            sharedSignal,
            (signalled: boolean) => signalled ?
                take.call(takeUntil.call(sharedSource, filter.call(sharedSignal, (signalled: boolean) => !signalled)), 1) :
                takeUntil.call(sharedSource, filter.call(sharedSignal, (signalled: boolean) => signalled))
        ));
    });
}
