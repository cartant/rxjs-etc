/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs";
import { buffer, concatAll } from "rxjs/operators";
import { GenericOperatorFunction } from "../GenericOperatorFunction";

export function hold(releaseNotifier: Observable<any>): GenericOperatorFunction {
    return source => source.pipe(
        buffer(releaseNotifier),
        concatAll()
    );
}
