/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, OperatorFunction, Subscription } from "rxjs";

interface Source<T> {
    completed: boolean;
    nexted: boolean;
    observable: Observable<T>;
    subscription?: Subscription;
    value?: T;
}

export function combineLatestHigherOrder<T>(): OperatorFunction<Observable<T>[], T[]> {
    return higherOrder => new Observable<T[]>(observer => {
        let lasts: Source<T>[] = [];
        let higherOrderCompleted = false;
        const higherOrderSubscription = new Subscription();
        higherOrderSubscription.add(higherOrder.subscribe(
            observables => {
                const subscribes: (() => void)[] = [];
                const nexts = observables.map(observable => {
                    const index = lasts.findIndex(l => l.observable === observable);
                    if (index !== -1) {
                        const next = lasts[index];
                        lasts.splice(index, 1);
                        return next;
                    }
                    const next: Source<T> = { completed: false, nexted: false, observable };
                    subscribes.push(() => {
                        next.subscription = next.observable.subscribe(
                            value => {
                                next.nexted = true;
                                next.value = value;
                                if (nexts.every(({ nexted }) => nexted)) {
                                    observer.next(nexts.map(({ value }) => value) as T[]);
                                }
                            },
                            error => observer.error(error),
                            () => {
                                next.completed = true;
                                if (higherOrderCompleted && nexts.every(({ completed }) => completed)) {
                                    observer.complete();
                                }
                            }
                        );
                        higherOrderSubscription.add(next.subscription);
                    });
                    return next;
                });
                lasts.forEach(({ subscription }) => {
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                });
                lasts = nexts;
                subscribes.forEach(subscribe => subscribe());
            },
            error => observer.error(error),
            () => {
                if (lasts.every(({ completed }) => completed)) {
                    observer.complete();
                }
                higherOrderCompleted = true;
            }
        ));
        return higherOrderSubscription;
    });
}
