/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";

// https://github.com/ReactiveX/rxjs/issues/2306

interface IterableLike<T> {
    [Symbol.iterator]: () => Iterator<T> | IterableIterator<T>;
}

export function fromIterable<T>(iterable: IterableLike<T>): Observable<T> {

    return from(iterable as any);
}
