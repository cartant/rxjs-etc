/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
  from,
  Observable,
  ObservableInput,
  ObservedValueOf,
  OperatorFunction,
  Subscription,
} from "rxjs";

const NO_VAL: any = {};

export const continueWith = <T, O extends ObservableInput<any>>(
  mapper: (value: T) => O
): OperatorFunction<T, T | ObservedValueOf<O>> => (source$) =>
  new Observable((observer) => {
    let latestValue: T = NO_VAL;
    const subscription = new Subscription();

    subscription.add(
      source$.subscribe({
        next: (val) => {
          observer.next((latestValue = val));
        },
        error: (e) => {
          observer.error(e);
        },
        complete: () => {
          if (latestValue === NO_VAL) {
            observer.complete();
          } else {
            const nextObservable$ = from(mapper(latestValue));
            subscription.add(nextObservable$.subscribe(observer));
          }
        },
      })
    );

    return subscription;
  });
