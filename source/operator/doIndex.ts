/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-invalid-this*/
/*tslint:disable:no-use-before-declare*/

import { Observable } from "rxjs/Observable";
import { tapIndex as higherOrder } from "../let/tapIndex";

export function doIndex<T>(
    this: Observable<T>,
    next: (value: T, index?: number) => void,
    error?: (error: any) => void,
    complete?: () => void
): Observable<T> {

    return higherOrder(next, error, complete)(this);
}
