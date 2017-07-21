/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { concat } from "rxjs/observable/concat";
import { empty } from "rxjs/observable/empty";

export function concatArray<T, R>(
    observables: Observable<T>[]
): Observable<R> {

    if (observables.length === 0) {
        return empty();
    }

    return concat.apply(null, observables);
}
