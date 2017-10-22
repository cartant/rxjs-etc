/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-invalid-this*/
/*tslint:disable:no-use-before-declare*/

import { Observable } from "rxjs/Observable";
import { Operator } from "rxjs/Operator";
import { Subscriber } from "rxjs/Subscriber";
import { TeardownLogic } from "rxjs/Subscription";

export function tapIndex<T>(
    next: (value: T, index?: number) => void,
    error?: (error: any) => void,
    complete?: () => void
): (source: Observable<T>) => Observable<T> {

    return function tapIndexOperatorFunction(source: Observable<T>): Observable<T> {
        return source.lift(new TapIndexOperator(next, error, complete));
    };
}

class TapIndexOperator<T> implements Operator<T, T> {

    constructor(
        private next?: (value: T, index: number) => void,
        private error?: (error: any) => void,
        private complete?: () => void
    ) {}

    call(subscriber: Subscriber<T>, source: any): TeardownLogic {

        return source.subscribe(new TapIndexSubscriber(
            subscriber,
            this.next,
            this.error,
            this.complete
        ));
    }
}

class TapIndexSubscriber<T> extends Subscriber<T> {

    private count: number = 0;
    private safeSubscriber: Subscriber<T>;

    constructor(
        destination: Subscriber<T>,
        next?: (value: T, index: number) => void,
        error?: (error: any) => void,
        complete?: () => void
    ) {

        super(destination);

        const safeSubscriber = new Subscriber<T>(
            (value: T) => { if (next) { next(value, this.count++); } },
            error,
            complete
        );
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }

    protected _next(value: T): void {

        const { safeSubscriber } = this;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error!(safeSubscriber.syncErrorValue);
        } else {
            this.destination.next!(value);
        }
    }

    protected _error(err: any): void {

        const { safeSubscriber } = this;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error!(safeSubscriber.syncErrorValue);
        } else {
            this.destination.error!(err);
        }
    }

    protected _complete(): void {

        const { safeSubscriber } = this;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error!(safeSubscriber.syncErrorValue);
        } else {
            this.destination.complete!();
        }
    }
}
