/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { IScheduler } from "rxjs/Scheduler";

import "rxjs/add/observable/concat";
import "rxjs/add/observable/of";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/publish";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeLast";
import "rxjs/add/operator/takeUntil";

export function debounceAfter<T, R>(
    notifier: Observable<R>,
    duration: number,
    scheduler?: IScheduler
): (source: Observable<T>) => Observable<T> {

    // https://stackoverflow.com/a/44257656/6680611

    return (source) => source.publish((sharedSource) => {

        // Until this is merged, the selector passed to publish cannot change the type:
        // https://github.com/ReactiveX/rxjs/pull/2616

        const signal: Observable<any> = notifier.switchMap(() => Observable.concat(
            Observable.of(true),
            Observable.of(false).delay(duration, scheduler)
        ))
        .startWith(false)
        .distinctUntilChanged();

        return signal.publish((sharedSignal) => sharedSignal.concatMap((signalled) => signalled ?
            sharedSource.takeUntil(sharedSignal.filter((signalled) => !signalled)).takeLast(1) :
            sharedSource.takeUntil(sharedSignal.filter((signalled) => signalled))
        ));
    });
}
