/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";
import { last } from "rxjs/operators/last";
import { map } from "rxjs/operators/map";
import { mergeMap } from "rxjs/operators/mergeMap";
import { toArray } from "rxjs/operators/toArray";

export function forkJoinConcurrent<T>(
    observables: Observable<T>[],
    concurrent: number
): Observable<T[]> {

    return from(observables).pipe(
        mergeMap(o => o.pipe(last()), (ov, iv, oi, ii) => ({ index: oi, value: iv }), concurrent),
        toArray(),
        map(a => a.sort((l, r) => r.index - l.index).map(e => e.value))
    );
}
