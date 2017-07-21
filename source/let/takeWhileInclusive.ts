/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

import "rxjs/add/operator/multicast";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/take";
import "rxjs/add/operator/takeWhile";

export function takeWhileInclusive<T>(predicate: (value: T) => boolean): (source: Observable<T>) => Observable<T> {

    // https://stackoverflow.com/a/44644237/6680611

    return (source) => source.multicast(
        () => new ReplaySubject<T>(1),
        (values) => values.takeWhile(predicate).concat(values.take(1))
    );
}
