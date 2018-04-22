/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { concat, from, MonoTypeOperatorFunction, Observable, SchedulerLike } from "rxjs";
import { isScheduler } from "../util";

export function endWith<T>(v1: T, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export function endWith<T>(v1: T, v2: T, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export function endWith<T>(v1: T, v2: T, v3: T, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export function endWith<T>(v1: T, v2: T, v3: T, v4: T, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export function endWith<T>(v1: T, v2: T, v3: T, v4: T, v5: T, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export function endWith<T>(v1: T, v2: T, v3: T, v4: T, v5: T, v6: T, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export function endWith<T>(...args: (T | SchedulerLike)[]): MonoTypeOperatorFunction<T>;
export function endWith<T>(...args: (T | SchedulerLike)[]): MonoTypeOperatorFunction<T> {

    let scheduler = args[args.length - 1] as (SchedulerLike | null);
    if (isScheduler(scheduler)) {
        args.pop();
    } else {
        scheduler = null;
    }
    return source => concat(source, from(args as T[], scheduler as any));
}
