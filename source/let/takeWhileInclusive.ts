/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { multicast } from "rxjs/operator/multicast";
import { concat } from "rxjs/operator/concat";
import { filter } from "rxjs/operator/filter";
import { take } from "rxjs/operator/take";
import { takeWhile } from "rxjs/operator/takeWhile";
import { ReplaySubject } from "rxjs/ReplaySubject";

export function takeWhileInclusive<T>(predicate: (value: T) => boolean): (source: Observable<T>) => Observable<T> {

    // https://stackoverflow.com/a/44644237/6680611

    return (source) => multicast.call(source,
        () => new ReplaySubject<T>(1),
        (sharedSource: Observable<T>) => concat.call(
            takeWhile.call(sharedSource, predicate),
            filter.call(take.call(sharedSource, 1), (value: T) => !predicate(value))
        )
    );
}
