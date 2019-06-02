/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { defer, Observable, Subject } from "rxjs";
import { finalize } from "rxjs/operators";

export interface ProgressState {
  finalized: number;
  total: number;
}

// TODO: Get this working and then re-arrange it. See if the array can be
// placed first, followed by the selector, with the creator last - and default
// it to using forkJoin.

export function progress<
  Observables extends Observable<any>[],
  Creator extends (...obervables: Observables) => Observable<any>,
  T
>(
  creator: Creator,
  selector: (
    source: ReturnType<Creator>,
    state: Observable<ProgressState>
  ) => Observable<T>,
  ...observables: Observables
): Observable<T> {
  return defer(() => {
    const finalizes = new Subject<undefined>();
    const source = creator(
      ...(observables.map(o =>
        o.pipe(finalize(() => finalizes.next(undefined)))
      ) as Observables)
    );
  });
}
