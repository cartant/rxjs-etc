/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { combineLatestArray } from "./combineLatestArray";
import { isObservable } from "../util";

export function combineLatestObject<T>(
  instance: { [K in keyof T]: T[K] | Observable<T[K]> }
): Observable<T> {
  type K = keyof T;
  const entries = Object.entries(instance) as [
    string,
    T[K] | Observable<T[K]>
  ][];
  const observables = entries.map(([, value]) =>
    isObservable(value) ? value : of(value)
  );
  return combineLatestArray(observables).pipe(
    map(values =>
      values.reduce(
        (acc, value, index) => ({ ...acc, [entries[index][0]]: value }),
        {} as T
      )
    )
  );
}
