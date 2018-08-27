/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { MonoTypeOperatorFunction, ReplaySubject, SchedulerLike } from "rxjs";
import { multicast, refCount } from "rxjs/operators";

export function shareReplay<T>(bufferSize?: number, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T> {
    return source => source.pipe(
        multicast(() => new ReplaySubject(bufferSize, windowTime, scheduler)),
        refCount()
    );
}
