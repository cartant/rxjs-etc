/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { expecter } from "ts-snippet";

describe("Piped", () => {

  if (!global["window"]) {
    const expectSnippet = expecter(
      code => `
        import { Observable, of } from "rxjs";
        import { debounceTime } from "rxjs/operators";
        import { Piped } from "./source/piped";
        ${code}
      `
    );

    it("should fail without being explicit typed", () => {
      expectSnippet(`
        const operator = debounceTime(1e3);
        const debounced: Observable<number> = of(42).pipe(operator);
      `).toFail(/not assignable to type 'Observable<number>'/);
    });

    it("should explicitly type a piped operator", () => {
      expectSnippet(`
        const operator = debounceTime(1e3) as Piped<number>;
        const debounced: Observable<number> = of(42).pipe(operator);
      `).toInfer("debounced", "Observable<number>");
    });
  }
});
