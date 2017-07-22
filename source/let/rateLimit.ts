/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { IScheduler } from "rxjs/Scheduler";
import { asap } from "rxjs/scheduler/asap";

import "rxjs/add/observable/of";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";

export function rateLimit<T>(period: number, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function rateLimit<T>(period: number, count: number, scheduler?: IScheduler): (source: Observable<T>) => Observable<T>;
export function rateLimit<T>(period: number, ...args: (number | IScheduler | undefined)[]): (source: Observable<T>) => Observable<T> {

    let count = 1;
    let scheduler: IScheduler = asap;

    if (args.length === 1) {
        if (typeof args[0] === "number") {
            count = args[0] as number;
        } else {
            scheduler = args[0] as IScheduler;
        }
    } else if (args.length === 2) {
        count = args[0] as number;
        scheduler = args[1] as IScheduler;
    }

    interface Emission<T> {
        delay: number;
        until: number;
        value: T;
    }

    const definedCount = count || 1;

    return (source) => source
        .scan((emissions: Emission<T>[], value: T) => {

            const now = scheduler.now();
            const since = now - period;

            emissions = emissions.filter((emission) => emission.until > since);
            if (emissions.length >= definedCount) {

                const leastRecentEmission = emissions[0];
                const mostRecentEmission = emissions[emissions.length - 1];
                const until = leastRecentEmission.until + (period * Math.floor(emissions.length / definedCount));

                emissions.push({
                    delay: (mostRecentEmission.until < now) ?
                        (until - now) :
                        (until - mostRecentEmission.until),
                    until,
                    value
                });

            } else {

                emissions.push({
                    delay: 0,
                    until: now,
                    value
                });
            }
            return emissions;

        }, [])
        .map((emissions: Emission<T>[]) => emissions[emissions.length - 1])
        .concatMap((emission: Emission<T>) => {

            const observable = Observable.of(emission.value);
            return emission.delay ? observable.delay(emission.delay, scheduler) : observable;
        });
}
