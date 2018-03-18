/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { page as staticPage } from "../../observable/page";

Observable.page = staticPage;

declare module "rxjs/Observable" {
    namespace Observable {
        export let page: typeof staticPage;
    }
}
