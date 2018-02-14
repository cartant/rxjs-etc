/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { isEmpty } from "rxjs/operators/isEmpty";
import { merge } from "rxjs/operators/merge";
import { mergeMap } from "rxjs/operators/mergeMap";
import { publish } from "rxjs/operators/publish";

export function defaultObservableIfEmpty<T>(
    defaultObservable: Observable<T>
): (source: Observable<T>) => Observable<T> {

    return (source: Observable<T>) => source.pipe(
        publish((sharedSource) => sharedSource.pipe(
            merge(sharedSource.pipe(
                isEmpty(),
                mergeMap((b: boolean) => b ? defaultObservable : empty<T>())
            ))
        )
    ));
}
