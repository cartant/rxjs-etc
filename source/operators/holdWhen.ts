/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs";
import { bufferWhen, concatAll } from "rxjs/operators";
import { GenericOperatorFunction } from "../GenericOperatorFunction";

export function holdWhen(releaseSelector: () => Observable<any>): GenericOperatorFunction {
    return source => source.pipe(
        bufferWhen(releaseSelector),
        concatAll()
    );
}
