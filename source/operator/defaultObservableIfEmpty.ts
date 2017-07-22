/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-invalid-this*/
/*tslint:disable:no-use-before-declare*/

import { Observable } from "rxjs/Observable";
import { defer } from "rxjs/observable/defer";
import { empty } from "rxjs/observable/empty";
import { concat } from "rxjs/operator/concat";
import { _do } from "rxjs/operator/do";

export function defaultObservableIfEmpty<T>(
    this: Observable<T>,
    defaultObservable: Observable<T>
): Observable<T> {

    const source = this;

    return defer(() => {

        let isEmpty = true;
        const composedDo = _do.call(source, () => isEmpty = false);
        const composedConcat = concat.call(
            composedDo,
            defer(() => isEmpty ? defaultObservable : empty())
        );
        return composedConcat;
    });
}
