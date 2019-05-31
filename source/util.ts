/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, SchedulerLike } from "rxjs";

export function isNonNulled<T>(value: T): value is NonNullable<T> {
  return value != null;
}

/** @deprecated Renamed to isNonNulled */
export const isNotNullish = isNonNulled;

export function isNulled<T>(
  value: T | null | undefined
): value is null | undefined {
  return value == null;
}

/** @deprecated Renamed to isNulled */
export const isNullish = isNulled;

export function isObservable(value: any): value is Observable<any> {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof value["subscribe"] === "function"
  );
}

export function isScheduler(
  value: object | null | undefined
): value is SchedulerLike {
  return Boolean(value && typeof value["schedule"] === "function");
}
