/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { forkJoin, Observable, Subject } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { ObservableValues } from "../util";

export interface ProgressState {
  finalized: number;
  nexted: number;
  total: number;
}

export function progress<
  Observables extends Observable<any>[],
  Creator extends (obervables: Observables) => Observable<any>,
  T
>(
  observables: Observables,
  selector: (
    state: Observable<ProgressState>,
    created: ReturnType<Creator>
  ) => Observable<T>,
  creator: Creator
): Observable<T>;

export function progress<Observables extends Observable<any>[], T>(
  observables: Observables,
  selector: (
    state: Observable<ProgressState>,
    created: Observable<ObservableValues<Observables>>
  ) => Observable<T>
): Observable<T>;

export function progress<
  Observables extends Observable<any>[],
  Creator extends (obervables: Observables) => Observable<any>,
  T
>(
  observables: Observables,
  selector: (
    state: Observable<ProgressState>,
    created: ReturnType<Creator>
  ) => Observable<T>,
  creator?: Creator
): Observable<T> {
  return new Observable(subscriber => {
    let finalized = 0;
    let nexted = 0;
    const total = observables.length;
    const state = new Subject<ProgressState>();
    const shared = new Subject<any>();
    const created = (creator || forkJoin)(observables.map(o =>
      o.pipe(
        tap(() =>
          state.next({
            finalized,
            nexted: ++nexted,
            total
          })
        ),
        finalize(() => {
          state.next({
            finalized: ++finalized,
            nexted,
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
