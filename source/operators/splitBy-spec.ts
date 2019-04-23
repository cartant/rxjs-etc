/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { mergeMap } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { splitBy } from "./splitBy";

describe("splitBy", () => {
  it(
    "should split values",
    marbles(m => {
      const source = m.cold("  --a-b-c-a-b-c-|");
      const x = m.cold("         a-----a-----|");
      const y = m.cold("         --b-c---b-c-|");
      const expected = "       --(xy)--------|";

      const split = source.pipe(
        splitBy(value => value === "a"),
        mergeMap(splits => splits)
      );
      m.expect(split).toBeObservable(expected, { x, y });
    })
  );
});
