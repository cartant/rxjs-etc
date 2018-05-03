/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { forkJoinArray } from "./forkJoinArray";
import { isObservable } from "../util";

export function forkJoinObject<T>(instance: { [K in keyof T]: T[K] | Observable<T[K]> }): Observable<T> {
    const entries = Object.entries(instance);
    return forkJoinArray(entries.map(([, value]) => isObservable(value) ? value : of(value))).pipe(
        map(values => values.reduce(
            (acc, value, index) => ({ ...acc, [entries[index][0]]: value }),
            {} as T
        ))
    );
}
