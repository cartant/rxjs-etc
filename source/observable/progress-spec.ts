/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unnecessary-callback-wrapper no-unused-expression*/

import { concat, merge, forkJoin, of } from "rxjs";
import { ignoreElements, tap } from "rxjs/operators";
import { progress } from "./progress";

// prettier-ignore
describe.only("progress", () => {
  it("should support forkJoin", () => {
    /*tslint:disable*/
    progress(
      [of("a"), of("b"), of("c")],
      o => forkJoin(...o),
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: ({ finalized }) => console.log(finalized)
          }),
          ignoreElements()
        ),
        concatenated
      )
    ).subscribe({
      complete: () => console.log("complete"),
      next: value => console.log(value)
    });
  });

  it("should support concat", () => {
    /*tslint:disable*/
    progress(
      [of("a"), of("b"), of("c")],
      o => concat(...o),
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: ({ finalized }) => console.log(finalized)
          }),
          ignoreElements()
        ),
        concatenated
      )
    ).subscribe({
      complete: () => console.log("complete"),
      next: value => console.log(value)
    });
  });

  it("should support merge", () => {
    /*tslint:disable*/
    progress(
      [of("a"), of("b"), of("c")],
      o => merge(...o),
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: ({ finalized }) => console.log(finalized)
          }),
          ignoreElements()
        ),
        concatenated
      )
    ).subscribe({
      complete: () => console.log("complete"),
      next: value => console.log(value)
    });
  });
});
