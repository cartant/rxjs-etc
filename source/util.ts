/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { IScheduler } from "rxjs/Scheduler";

export function isObservable(value: any): value is Observable<any> {

     return value && (typeof value["subscribe"] === "function");
}

export function isScheduler(value: any): value is IScheduler {

    return value && (typeof value["schedule"] === "function");
}
