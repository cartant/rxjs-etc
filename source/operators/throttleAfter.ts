/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { concat } from "rxjs/observable/concat";
import { of } from "rxjs/observable/of";
import { concatMap } from "rxjs/operators/concatMap";
import { delay } from "rxjs/operators/delay";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { filter } from "rxjs/operators/filter";
import { publish } from "rxjs/operators/publish";
import { startWith } from "rxjs/operators/startWith";
import { switchMap } from "rxjs/operators/switchMap";
import { take } from "rxjs/operators/take";
import { takeUntil } from "rxjs/operators/takeUntil";
import { IScheduler } from "rxjs/Scheduler";

export function throttleAfter<T>(
    notifier: Observable<any>,
    duration: number,
    scheduler?: IScheduler
): (source: Observable<T>) => Observable<T> {

    return (source: Observable<T>) => source.pipe(
        publish((sharedSource) => notifier.pipe(
            switchMap(() => concat(
                of(true),
                delay<boolean>(duration, scheduler)(of(false))
            )),
            startWith(false),
            distinctUntilChanged(),
            publish<boolean, T>((sharedSignal: Observable<boolean>) => sharedSignal.pipe(
                concatMap((signalled: boolean) => signalled ?
                    sharedSource.pipe(
                        takeUntil(sharedSignal.pipe(filter((signalled: boolean) => !signalled))),
                        take(1)
                    ) :
                    sharedSource.pipe(
                        takeUntil(sharedSignal.pipe(filter((signalled: boolean) => signalled)))
                    )
                )
            ))
        ))
    );
}
