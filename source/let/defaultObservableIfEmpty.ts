/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { isEmpty } from "rxjs/operator/isEmpty";
import { merge } from "rxjs/operator/merge";
import { mergeMap } from "rxjs/operator/mergeMap";
import { publish } from "rxjs/operator/publish";

export function defaultObservableIfEmpty<T>(
    defaultObservable: Observable<T>
): (source: Observable<T>) => Observable<T> {

    return (source) => publish.call(source, (sharedSource: Observable<T>) => merge.call(
        sharedSource,
        mergeMap.call(isEmpty.call(sharedSource), (b: boolean) => b ? defaultObservable : empty<T>())
    ));
}
