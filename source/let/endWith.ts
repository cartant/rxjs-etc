/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { IScheduler } from "rxjs/Scheduler";
import { isScheduler } from "../util";

import "rxjs/add/observable/from";
import "rxjs/add/operator/concat";

export function endWith<T>(v1: T, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function endWith<T>(v1: T, v2: T, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function endWith<T>(v1: T, v2: T, v3: T, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function endWith<T>(v1: T, v2: T, v3: T, v4: T, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function endWith<T>(v1: T, v2: T, v3: T, v4: T, v5: T, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function endWith<T>(v1: T, v2: T, v3: T, v4: T, v5: T, v6: T, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function endWith<T>(...args: (T | IScheduler)[]): (source: Observable<T>) => Observable<T>;
export function endWith<T>(...args: (T | IScheduler)[]): (source: Observable<T>) => Observable<T> {

    let scheduler = args[args.length - 1] as (IScheduler | null);
    if (isScheduler(scheduler)) {
        args.pop();
    } else {
        scheduler = null;
    }
    return (source) => source.concat(Observable.from(args as T[], scheduler as any));
}
