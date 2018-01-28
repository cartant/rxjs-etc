/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

"use strict";

require("./bundle-common")({
    bundle: "./bundles/rxjs-etc-test.umd.js",
    entry: "./build/index-spec.js",
    name: "RxExtraTest",
    useGlobal: false
});
