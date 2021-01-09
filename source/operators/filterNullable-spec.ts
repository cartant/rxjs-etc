/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { marbles } from "rxjs-marbles";
import { filterNullable } from "./filterNullable";

// prettier-ignore
describe("filterNullable", () => {
  it(
    "should not filter falsy values except for null and undefined",
    marbles(m => {
      const values = { a: 0, b: false, c: NaN, d: "" };

      const source = m.cold("   -a-b-c-d-|", values);
      const subs = "            ^--------!";
      const expected = m.cold(" -a-b-c-d-|", values);

      const destination = source.pipe(
        filterNullable()
      );
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    "should filter null and undefined",
    marbles(m => {
      const values = { a: null, b: 1, c: undefined };

      const source = m.cold("   -a-b-c-|", values);
      const subs = "            ^------!";
      const expected = m.cold(" ---b---|", { b: values.b });

      const destination = source.pipe(
        filterNullable()
      );
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );
});
