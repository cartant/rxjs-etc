/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { EMPTY, merge, MonoTypeOperatorFunction, Observable } from "rxjs";
import { isEmpty, mergeMap, publish } from "rxjs/operators";

export function defaultObservableIfEmpty<T>(
    defaultObservable: Observable<T>
): MonoTypeOperatorFunction<T> {

    return (source: Observable<T>) => source.pipe(
        publish(sharedSource => merge(
            sharedSource,
            sharedSource.pipe(
                isEmpty(),
                mergeMap((b: boolean) => b ? defaultObservable : EMPTY)
            )
        ))
    );
}

export const switchIfEmpty = defaultObservableIfEmpty;
