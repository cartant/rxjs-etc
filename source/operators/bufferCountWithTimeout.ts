/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { OperatorFunction, SchedulerLike, timer } from "rxjs";
import {
  exhaustMap,
  share,
  startWith,
  take,
  takeUntil,
  toArray,
} from "rxjs/operators";

export interface Config {
  /** Maximum number of items each buffer can have */
  count: number;
  /** Maximum amout of time each buffer can spend collecting items (unit: millisecond) */
  timeout: number;
  /** Scheduler used by the `timer` operator */
  scheduler?: SchedulerLike;
}

export function bufferCountWithTimeout<T>({
  count,
  timeout,
  scheduler,
}: Config): OperatorFunction<T, T[]> {
  return (source) => {
    const sharedSource = source.pipe(share());
    return sharedSource.pipe(
      exhaustMap((x) =>
        sharedSource.pipe(
          startWith(x),
          take(count),
          takeUntil(timer(timeout, scheduler)),
          toArray()
        )
      )
    );
  };
}
