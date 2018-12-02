/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { bufferWhen, concatAll, distinctUntilChanged, publish, switchMap, takeUntil } from "rxjs/operators";
import { hasCompleted } from "./hasCompleted";
import { prioritize } from "./prioritize";

export function pause<T>(notifier: Observable<boolean>): MonoTypeOperatorFunction<T> {
    return source => source.pipe(
        publish(published => notifier.pipe(
            distinctUntilChanged(),
            prioritize((prioritized, deprioritized) => deprioritized.pipe(
                switchMap(paused => paused ?
                    published.pipe(
                        bufferWhen(() => prioritized),
                        concatAll()
                    ) :
                    published
                )
            )),
            takeUntil(source.pipe(
                hasCompleted()
            ))
        ))
    );
}
