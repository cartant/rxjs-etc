/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { MonoTypeOperatorFunction, Observable } from "rxjs";

export function pause<T>(
    pauseNotifier: Observable<any>,
    resumeNotifier: Observable<any>,
    paused: boolean = false
): MonoTypeOperatorFunction<T> {
    throw new Error("Not implemented");
}
