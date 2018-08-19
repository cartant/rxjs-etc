/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { concat, MonoTypeOperatorFunction, race, SchedulerLike, timer } from "rxjs";
import { mapTo, publish } from "rxjs/operators";

export function startWithTimeout<T>(value: T, duration: number | Date, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T> {
    return source => source.pipe(publish(published => race(
        published,
        concat(timer(duration, scheduler).pipe(mapTo(value)), published)
    )));
}
