/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { startWithTimeout } from "./startWithTimeout";
import { marbles } from "rxjs-marbles";

describe("startWithTimeout", () => {
  it(
    "should do nothing if the source emits within the duration",
    marbles(m => {
      const source = m.cold("--a--b--c--|");
      const subs = "^----------!";
      const expected = m.cold("--a--b--c--|");

      const destination = source.pipe(startWithTimeout("z", m.time("---|")));
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    "should emit the value if the source is empty",
    marbles(m => {
      const source = m.cold("-----------|");
      const subs = "^----------!";
      const expected = m.cold("---z-------|");

      const destination = source.pipe(startWithTimeout("z", m.time("---|")));
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    "should emit the value if the source emits after the duration",
    marbles(m => {
      const source = m.cold("-----a-b-c-|");
      const subs = "^----------!";
      const expected = m.cold("---z-a-b-c-|");

      const destination = source.pipe(startWithTimeout("z", m.time("---|")));
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    "should not emit if the source completes within the duration",
    marbles(m => {
      const source = m.cold("--|");
      const subs = "^-!";
      const expected = m.cold("--|");

      const destination = source.pipe(startWithTimeout("z", m.time("---|")));
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );
});
