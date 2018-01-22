/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { merge } from "rxjs/observable/merge";

export function mergeArray<T, R>(
    observables: Observable<T>[],
    concurrent?: number
): Observable<R> {

    if (observables.length === 0) {
        return empty();
    }

    const applyArgs: any[] = [...observables];
    if (concurrent) { applyArgs.push(concurrent); }
    return merge.apply(null, applyArgs);
}
