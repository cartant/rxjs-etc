/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter, publish, switchMap, takeUntil } from "rxjs/operators";
import { indexElements } from "./indexElements";

export function latch<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T> {
    const indices = notifier.pipe(indexElements());
    return source => indices.pipe(
        publish(sharedIndices => {
            const evens = sharedIndices.pipe(filter(index => (index % 2) === 0));
            const odds = sharedIndices.pipe(filter(index => (index % 2) === 1));
            return evens.pipe(switchMap(() => source.pipe(takeUntil(odds))));
        })
    );
}
