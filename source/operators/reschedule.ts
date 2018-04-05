/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { asapScheduler, Observable, of, SchedulerLike } from "rxjs";
import { concatMap } from "rxjs/operators";

export function reschedule<T>(scheduler: SchedulerLike = asapScheduler): (source: Observable<T>) => Observable<T> {
    return concatMap<T, T>(value => of(value, scheduler));
}
