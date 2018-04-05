/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, Observer, SchedulerLike } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { subsequent } from "./subsequent";

export function debounceTimeSubsequent<T>(
    duration: number,
    count: number,
    scheduler?: SchedulerLike
): (source: Observable<T>) => Observable<T>;

export function debounceTimeSubsequent<T>(
    duration: number,
    scheduler?: SchedulerLike
): (source: Observable<T>) => Observable<T>;

export function debounceTimeSubsequent<T>(
    duration: number,
    countOrScheduler?: number | SchedulerLike,
    scheduler?: SchedulerLike
): (source: Observable<T>) => Observable<T> {

    let count: number;
    if (typeof countOrScheduler === "number") {
        count = countOrScheduler;
    } else {
        count = 1;
        scheduler = countOrScheduler;
    }
    return subsequent(count, s => s.pipe(debounceTime(duration, scheduler)));
}
