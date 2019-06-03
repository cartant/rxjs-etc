/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-console no-unnecessary-callback-wrapper no-unused-expression rxjs-no-ignored-subscription*/

import { concat, forkJoin, merge, of, Subject } from "rxjs";
import { ignoreElements, tap } from "rxjs/operators";
import { progress } from "./progress";

// prettier-ignore
describe.only("progress", () => {
  it("should default to forkJoin", () => {
    const b = new Subject<string>();
    progress(
      [of("a"), b, of("c")],
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: state => console.log(state)
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

  it("should support forkJoin", () => {
    const b = new Subject<string>();
    progress(
      [of("a"), b, of("c")],
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: state => console.log(state)
          }),
          ignoreElements()
        ),
        concatenated
      ),
      o => forkJoin(...o)
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
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: state => console.log(state)
          }),
          ignoreElements()
        ),
        concatenated
      ),
      o => concat(...o)
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
      (state, concatenated) => merge(
        state.pipe(
          tap({
            complete: () => console.log("state complete"),
            next: state => console.log(state)
          }),
          ignoreElements()
        ),
        concatenated
      ),
      o => merge(...o)
    ).subscribe({
      complete: () => console.log("complete"),
      next: value => console.log(value)
    });
    b.next("b");
    b.complete();
  });
});
