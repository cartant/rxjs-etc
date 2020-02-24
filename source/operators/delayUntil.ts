/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { concat, NEVER, Observable, OperatorFunction } from "rxjs";
import { buffer, mergeAll, publish, take } from "rxjs/operators";

export function delayUntil<T>(
  notifier: Observable<any>
): OperatorFunction<T, T> {
  return source =>
    source.pipe(
      publish(published =>
        concat(
          concat(published, NEVER).pipe(buffer(notifier), take(1), mergeAll()),
          published
        )
      )
    );
}
