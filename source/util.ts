/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, SchedulerLike } from "rxjs";

export function isNotNullish<T>(value: T | null | undefined): value is T {
    return (value !== null) && (value !== undefined);
}

export function isNullish<T>(value: T | null | undefined): value is null | undefined {
    return (value === null) || (value === undefined);
}

export function isObservable(value: object | null | undefined): value is Observable<any> {
     return Boolean(value && (typeof value["subscribe"] === "function"));
}

export function isScheduler(value: object | null | undefined): value is SchedulerLike {
    return Boolean(value && (typeof value["schedule"] === "function"));
}
