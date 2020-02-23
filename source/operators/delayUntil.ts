/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { concat, Observable, OperatorFunction } from "rxjs";
import { buffer, first, mergeAll, publish } from "rxjs/operators";

export function delayUntil<T>(
  notifier: Observable<any>
): OperatorFunction<T, T> {
  return source =>
    source.pipe(
      publish(published =>
        concat(published.pipe(buffer(notifier), first(), mergeAll()), published)
      )
    );
}
