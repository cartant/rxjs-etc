/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { concatMap } from "rxjs/operator/concatMap";
import { delay } from "rxjs/operator/delay";
import { map } from "rxjs/operator/map";
import { scan } from "rxjs/operator/scan";
import { IScheduler } from "rxjs/Scheduler";
import { asap } from "rxjs/scheduler/asap";

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

    return (source) => {

        const scanned = scan.call(source, (emissions: Emission<T>[], value: T) => {

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

        }, []);

        const mapped = map.call(scanned, (emissions: Emission<T>[]) => emissions[emissions.length - 1]);

        const concatted = concatMap.call(mapped, (emission: Emission<T>) => {

            const observable = of(emission.value);
            return emission.delay ? delay.call(observable, emission.delay, scheduler) : observable;
        });
        return concatted;
    };
}
