/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { forkJoinConcurrent as staticForkJoinConcurrent } from "../../observable/forkJoinConcurrent";

Observable.forkJoinConcurrent = staticForkJoinConcurrent;

declare module "rxjs/Observable" {
    namespace Observable {
        export let forkJoinConcurrent: typeof staticForkJoinConcurrent;
    }
}
