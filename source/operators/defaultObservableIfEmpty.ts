/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { EMPTY, Observable } from "rxjs";
import { isEmpty, merge, mergeMap, publish } from "rxjs/operators";

export function defaultObservableIfEmpty<T>(
    defaultObservable: Observable<T>
): (source: Observable<T>) => Observable<T> {

    return (source: Observable<T>) => source.pipe(
        publish((sharedSource) => sharedSource.pipe(
            merge(sharedSource.pipe(
                isEmpty(),
                mergeMap((b: boolean) => b ? defaultObservable : EMPTY)
            ))
        )
    ));
}
