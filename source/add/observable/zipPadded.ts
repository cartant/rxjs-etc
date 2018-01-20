/**
 * @license Copyright © 2018 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { zipPadded as staticZipPadded } from "../../observable/zipPadded";

Observable.zipPadded = staticZipPadded;

declare module "rxjs/Observable" {
    namespace Observable {
        export let zipPadded: typeof staticZipPadded;
    }
}
