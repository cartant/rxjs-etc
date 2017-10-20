/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";

export function guard<T, R extends T>(
    guard: (value: T) => value is R,
    message?: string
): (source: Observable<T>) => Observable<R> {

    return (source: Observable<T>) => source.pipe(map((value: any) => {

        if (guard(value)) {
            return value;
        }

        const error = new Error(message || "Guard rejection.");
        error["value"] = value;
        throw error;
    }));
}
