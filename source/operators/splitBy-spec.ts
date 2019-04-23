/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { mergeMap } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { expecter } from "ts-snippet";
import { splitBy } from "./splitBy";
import { compiler } from "../compiler-spec";
import { timeout } from "../timeout-spec";

describe("splitBy", function () {
  /*tslint:disable-next-line:no-invalid-this*/
  this.timeout(timeout);

  it(
    "should split values",
    marbles(m => {
      const source = m.cold(" --a-b-c-a-b-c-|");
      const x = m.cold("      --a-----a-----|");
      const y = m.cold("      ----b-c---b-c-|");
      const expected = "      (xy)----------|";

      const split = source.pipe(
        splitBy(value => value === "a"),
        mergeMap(splits => splits)
      );
      m.expect(split).toBeObservable(expected, { x, y });
    })
  );

  if (!global["window"]) {
    const expectSnippet = expecter(
      code => `
        import { Observable, of } from "rxjs";
        import { splitBy } from "./source/operators/splitBy";
        ${code}
      `,
      compiler
    );

    it("should infer a type guard predicate", () => {
      expectSnippet(`
        function isNumber(value: any): value is number {
          return typeof value === "string";
        }
        const split = of(42 as any, "54" as any).pipe(
          splitBy(isNumber)
        );
      `).toInfer("split", "Observable<[Observable<number>, Observable<any>]>");
    });
  }
});
