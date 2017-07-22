/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/defer";
import "rxjs/add/observable/empty";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/do";

export function defaultObservableIfEmpty<T>(
    defaultObservable: Observable<T>
): (source: Observable<T>) => Observable<T> {

    return (source) => {

        let isEmpty = true;

        return source
            .do(() => { isEmpty = false; })
            .concat(Observable.defer(() => isEmpty ?
                defaultObservable :
                Observable.empty<T>()
            ));
    };
}
