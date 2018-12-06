/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { MonoTypeOperatorFunction, ObservableInput } from "rxjs";

export function mergeTap<T>(next: (t: T) => ObservableInput<any>, error?: (e: any) => void, complete?: () => void): MonoTypeOperatorFunction<T> {
    throw new Error("Not implemented");
}
