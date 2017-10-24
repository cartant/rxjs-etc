/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { never } from "rxjs/observable/never";
import { timer } from "rxjs/observable/timer";
import { using } from "rxjs/observable/using";
import { scan } from "rxjs/operators/scan";
import { switchMap } from "rxjs/operators/switchMap";
import { tap } from "rxjs/operators/tap";
import { IScheduler } from "rxjs/Scheduler";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

export function refCountAuditTime<T>(
    duration: number,
    scheduler?: IScheduler
): (source: Observable<T>) => Observable<T> {

    return (source: Observable<T>) => {

        // This implementation is based upon:
        // https://medium.com/@volkeron/rxjs-unsubscribe-delay-218a9ab2672e

        const connectable: ConnectableObservable<T> = source as any;
        let subscription: Subscription | null = null;

        const notifier = new Subject<number>();
        const controller = notifier.pipe(
            scan((acc, step) => acc + step, 0),
            switchMap(count => (count === 0) ?
                timer(duration, scheduler).pipe(
                    tap(() => {
                        subscription!.unsubscribe();
                        subscription = null;
                    })
                ) :
                never()
            )
        );

        return using(() => {
            if (subscription === null) {
                subscription = controller.subscribe();
                subscription.add(connectable.connect());
            }
            notifier.next(1);
            return { unsubscribe: () => notifier.next(-1) };
        }, () => source);
    };
}
