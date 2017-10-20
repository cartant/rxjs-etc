/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { multicast } from "rxjs/operators/multicast";
import { concat } from "rxjs/operators/concat";
import { filter } from "rxjs/operators/filter";
import { take } from "rxjs/operators/take";
import { takeWhile } from "rxjs/operators/takeWhile";
import { ReplaySubject } from "rxjs/ReplaySubject";

export function takeWhileInclusive<T>(predicate: (value: T) => boolean): (source: Observable<T>) => Observable<T> {

    // https://stackoverflow.com/a/44644237/6680611

    return (source) => source.pipe(
        multicast(() => new ReplaySubject<T>(1), (sharedSource) => sharedSource.pipe(
            takeWhile(predicate),
            concat(sharedSource.pipe(take(1), filter((value) => !predicate(value))))
        ))
    );
}
