/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { zip } from "rxjs/observable/zip";
import { first } from "rxjs/operators/first";
import { map } from "rxjs/operators/map";
import { publish } from "rxjs/operators/publish";

export class NotificationQueue extends Observable<number> {

    private _count = 0;
    private _notifications: ConnectableObservable<number>;
    private _queuer = new Subject<number>();

    constructor(notifier: Observable<any>) {

        super((observer: Observer<number>) => {
            const index = this._count++;
            const subscription = this._notifications.pipe(
                first(value => value === index)
            ).subscribe(observer);
            this._queuer.next(index);
            return subscription;
        });

        this._notifications = zip(notifier, this._queuer).pipe(
            map(([, index]) => index),
            publish()
        ) as ConnectableObservable<number>;
    }

    connect(): Subscription {
        return this._notifications.connect();
    }
}
