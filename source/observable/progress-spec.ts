/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unnecessary-callback-wrapper no-unused-expression*/

import { concat, merge, of } from "rxjs";
import { ignoreElements, tap } from "rxjs/operators";
import { progress } from "./progress";

// prettier-ignore
describe("progress", () => {

  it.only("should look something like this", () => {
    /*tslint:disable*/
    progress(
      (...o) => concat(...o),
      (result, state) => merge(
        state.pipe(
          tap(({ finalized }) => console.log(finalized)),
          ignoreElements()
        ),
        result
      ),
      of("a"), of("b"), of("c")
    ).subscribe(value => console.log(value));
  });
});
