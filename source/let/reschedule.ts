/**
 * @license Copyright © 2018 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { concatMap } from "rxjs/operators/concatMap";
import { Scheduler } from "rxjs/Scheduler";
import { asap } from "rxjs/scheduler/asap";

export function reschedule<T>(scheduler: Scheduler = asap): (source: Observable<T>) => Observable<T> {
    return concatMap<T, T>(value => of(value, scheduler));
}
