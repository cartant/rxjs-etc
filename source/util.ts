/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, SchedulerLike } from "rxjs";

export function isObservable(value: any): value is Observable<any> {

     return value && (typeof value["subscribe"] === "function");
}

export function isScheduler(value: any): value is SchedulerLike {

    return value && (typeof value["schedule"] === "function");
}
