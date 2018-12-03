/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter, first, map, mergeMap, publishReplay, startWith } from "rxjs/operators";

export function pause<T>(notifier: Observable<boolean>, paused: boolean = false): MonoTypeOperatorFunction<T> {
    return source => notifier.pipe(
        startWith(paused),
        publishReplay(1, undefined, published => source.pipe(
            mergeMap(value => published.pipe(
                filter(p => !p),
                first(),
                map(() => value)
            ))
        ))
    );
}
