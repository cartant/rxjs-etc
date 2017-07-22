/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/empty";
import "rxjs/add/operator/isEmpty";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/publish";

export function defaultObservableIfEmpty<T>(
    defaultObservable: Observable<T>
): (source: Observable<T>) => Observable<T> {

    return (source) => source.publish((sharedSource) => sharedSource.merge(
        sharedSource.isEmpty().mergeMap((empty) => {
            return empty ?
                defaultObservable :
                Observable.empty<T>();
        })
    ));
}
