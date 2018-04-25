/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { from, Observable } from "rxjs";
import { last, map, mergeMap, toArray } from "rxjs/operators";

export function forkJoinConcurrent<T>(
    observables: Observable<T>[],
    concurrent: number
): Observable<T[]> {

    return from(observables).pipe(
        mergeMap((outerValue, outerIndex) => outerValue.pipe(
            last(),
            map((innerValue, innerIndex) => ({ index: outerIndex, value: innerValue }))
        ), concurrent),
        toArray(),
        map(a => a.sort((l, r) => l.index - r.index).map(e => e.value))
    );
}
