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

export function progress<
  Observables extends Observable<any>[],
  Creator extends (obervables: Observables) => Observable<any>,
  T
>(
  observables: Observables,
  creator: Creator,
  selector: (
    state: Observable<ProgressState>,
    created: ReturnType<Creator>
  ) => Observable<T>
): Observable<T> {
  return new Observable(subscriber => {
    let finalized = 0;
    const total = observables.length;
    const state = new Subject<ProgressState>();
    const shared = new Subject<any>();
    const created = creator(observables.map(o =>
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
    ) as Observables);
    const selected = selector(state, shared as any);
    const subscription = selected.subscribe(subscriber);
    subscription.add(created.subscribe(shared));
    return subscription;
  });
}
