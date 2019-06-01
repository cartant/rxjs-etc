/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unnecessary-callback-wrapper no-unused-expression*/

import { concat, merge, of } from "rxjs";
import { ignoreElements, mergeMap, tap } from "rxjs/operators";
import { progress } from "./progress";

// prettier-ignore
describe("progress", () => {

  it.skip("should look something like this", () => {
    /*tslint:disable*/
    progress(
      (...o) => concat(...o),
      of(1), of(2), of(3)
    ).pipe(
      mergeMap(([result, state]) => merge(
        state.pipe(
          tap(({ complete }) => console.log(complete)),
          ignoreElements()
        ),
        result
      ))
    ).subscribe(value => console.log(value));
  });
});
