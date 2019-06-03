/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unnecessary-callback-wrapper no-unused-expression*/

import { concat, forkJoin, merge, of, Subject } from "rxjs";
import { ignoreElements, tap } from "rxjs/operators";
import { progress } from "./progress";

// prettier-ignore
describe.only("progress", () => {
  it("should support forkJoin", () => {
    const b = new Subject<string>();
    progress(
      [of("a"), b, of("c")],
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
    b.next("b");
    b.complete();
  });

  it("should support concat", () => {
    const b = new Subject<string>();
    progress(
      [of("a"), b, of("c")],
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
    b.next("b");
    b.complete();
  });

  it("should support merge", () => {
    const b = new Subject<string>();
    progress(
      [of("a"), b, of("c")],
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
    b.next("b");
    b.complete();
  });
});
