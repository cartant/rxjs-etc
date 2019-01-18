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
        mergeMap((observable, observableIndex) => observable.pipe(
            last(),
            map(value => ({ index: observableIndex, value }))
        ), concurrent),
        toArray(),
        map(pairs => pairs.sort((l, r) => l.index - r.index).map(pair => pair.value))
    );
}
