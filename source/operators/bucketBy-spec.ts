/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { mergeMap } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { bucketBy } from "./bucketBy";

describe("bucketBy", () => {
  it(
    "should bucket values",
    marbles(m => {
      const source = m.cold("  --a-b-c-a-b-c-|");
      const x = m.cold("         a-----a-----|");
      const y = m.cold("         --b-----b---|");
      const z = m.cold("         ----c-----c-|");
      const expected = "       --(xyz)-------|";

      const bucketed = source.pipe(
        bucketBy(3, value => value.charCodeAt(0) - "a".charCodeAt(0)),
        mergeMap(buckets => buckets)
      );
      m.expect(bucketed).toBeObservable(expected, { x, y, z });
    })
  );

  it.skip("should handle hash values that exceed the count", () => {
  });

  it.skip("should handle negative hash values", () => {
  });

  it.skip("should handle floating-point hash values", () => {
  });

  it.skip("should forward errors thrown from the hash selector", () => {
  });
});
