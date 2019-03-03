/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { SchedulerLike } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { subsequent } from "./subsequent";
import { GenericOperatorFunction } from "../GenericOperatorFunction";

export function debounceTimeSubsequent(
    duration: number,
    count: number,
    scheduler?: SchedulerLike
): GenericOperatorFunction;

export function debounceTimeSubsequent(
    duration: number,
    scheduler?: SchedulerLike
): GenericOperatorFunction;

export function debounceTimeSubsequent(
    duration: number,
    countOrScheduler?: number | SchedulerLike,
    scheduler?: SchedulerLike
): GenericOperatorFunction {

    let count: number;
    if (typeof countOrScheduler === "number") {
        count = countOrScheduler;
    } else {
        count = 1;
        scheduler = countOrScheduler;
    }
    return subsequent(count, debounceTime(duration, scheduler));
}
