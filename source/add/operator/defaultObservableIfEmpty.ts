/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { defaultObservableIfEmpty } from "../../operator/defaultObservableIfEmpty";

Observable.prototype.defaultObservableIfEmpty = defaultObservableIfEmpty;

declare module "rxjs/Observable" {
    interface Observable<T> {
        defaultObservableIfEmpty: typeof defaultObservableIfEmpty;
    }
}
