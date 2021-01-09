/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, OperatorFunction } from "rxjs";
import { filter } from "rxjs/operators";

export function filterNullable<T>(): OperatorFunction<T, NonNullable<T>> {
  return (source: Observable<T>) =>
    source.pipe(
      filter((x): x is NonNullable<T> => x !== null && x !== undefined)
    );
}
