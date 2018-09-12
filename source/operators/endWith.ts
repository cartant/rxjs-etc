/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { concat, from, OperatorFunction, SchedulerLike } from "rxjs";
import { isScheduler } from "../util";

export function endWith<T, S1 = T>(v1: S1, scheduler?: SchedulerLike): OperatorFunction<T, T | S1>;
export function endWith<T, S1 = T, S2 = T>(v1: S1, v2: S2, scheduler?: SchedulerLike): OperatorFunction<T, T | S1 | S2>;
export function endWith<T, S1 = T, S2 = T, S3 = T>(v1: S1, v2: S2, v3: S3, scheduler?: SchedulerLike): OperatorFunction<T, T | S1 | S2 | S3>;
export function endWith<T, S1 = T, S2 = T, S3 = T, S4 = T>(v1: S1, v2: S2, v3: S3, v4: S4, scheduler?: SchedulerLike): OperatorFunction<T, T | S1 | S2 | S3 | S4>;
export function endWith<T, S1 = T, S2 = T, S3 = T, S4 = T, S5 = T>(v1: S1, v2: S2, v3: S3, v4: S4, v5: S5, scheduler?: SchedulerLike): OperatorFunction<T, T | S1 | S2 | S3 | S4 | S5>;
export function endWith<T, S1 = T, S2 = T, S3 = T, S4 = T, S5 = T, S6 = T>(v1: S1, v2: S2, v3: S3, v4: S4, v5: S5, v6: S6, scheduler?: SchedulerLike): OperatorFunction<T, T | S1 | S2 | S3 | S4 | S5 | S6>;
export function endWith<T, S = T>(...args: (S | SchedulerLike)[]): OperatorFunction<T, T | S>;
export function endWith<T, S>(...args: (S | SchedulerLike)[]): OperatorFunction<T, T | S> {

    let scheduler = args[args.length - 1] as (SchedulerLike | null);
    if (isScheduler(scheduler)) {
        args.pop();
    } else {
        scheduler = null;
    }
    return source => concat(source, from(args as S[], scheduler as any));
}
