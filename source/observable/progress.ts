/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, Subject, Subscription } from "rxjs";
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
  return new Observable(subscriber => {
    let finalized = 0;
    const total = observables.length;
    const source = new Subject<any>();
    const state = new Subject<ProgressState>();
    const created = creator(
      ...(observables.map(o =>
        o.pipe(
          finalize(() => {
            state.next({
              finalized: ++finalized,
              total
            });
            if (finalized === total) {
              state.complete();
            }
          })
        )
      ) as Observables)
    );
    const subscription = new Subscription();
    const selected = selector(source as any, state);
    subscription.add(selected.subscribe(subscriber));
    subscription.add(created.subscribe(source));
    return subscription;
  });
}
