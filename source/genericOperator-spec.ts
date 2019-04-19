/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:deprecation no-unused-expression*/

import { pipe } from "rxjs";
import { delay, distinctUntilChanged } from "rxjs/operators";
import { marbles } from "rxjs-marbles";
import { expecter } from "ts-snippet";
import { timeout } from "./timeout-spec";
import { genericOperator } from "./genericOperator";

describe("genericOperator", function(): void {
  /*tslint:disable-next-line:no-invalid-this*/
  this.timeout(timeout);

  describe("functionality", () => {
    it(
      "should pipe a mono-type operator",
      marbles(m => {
        const source = m.cold("-a-|");
        const expected = "--a-|";

        const duration = m.time("-|");
        const operator = genericOperator(delay(duration));
        const destination = source.pipe(operator);
        m.expect(destination).toBeObservable(expected);
      })
    );

    it(
      "should pipe multiple mono-type operators",
      marbles(m => {
        const source = m.cold("-a-a-|");
        const expected = "--a---|";

        const duration = m.time("-|");
        const operator = genericOperator(
          pipe(
            delay(duration),
            distinctUntilChanged()
          )
        );
        const destination = source.pipe(operator);
        m.expect(destination).toBeObservable(expected);
      })
    );
  });

  if (!global["window"]) {
    describe("types", () => {
      const expectSnippet = expecter(
        code => `
                import { delay, map } from "rxjs/operators";
                import { genericOperator } from "./source/genericOperator";
                ${code}
            `,
        { strict: true }
      );

      it("should infer a generic operator from OperatorFunction<{}, {}>", () => {
        const snippet = expectSnippet(`
                    const operator = delay(10);
                    const result = genericOperator(operator);
                `);
        snippet.toInfer("operator", "MonoTypeOperatorFunction<{}>");
        snippet.toInfer(
          "result",
          "<T>(source: Observable<T>) => Observable<T>"
        );
      });

      it("should infer never from OperatorFunction<number, {}>", () => {
        const snippet = expectSnippet(`
                    const operator = map<number, {}>(() => 42);
                    const result = genericOperator(operator);
                `);
        snippet.toInfer("operator", "OperatorFunction<number, {}>");
        snippet.toInfer("result", "never");
      });

      it("should infer never from OperatorFunction<{}, number>", () => {
        const snippet = expectSnippet(`
                    const operator = map<{}, number>(() => 42);
                    const result = genericOperator(operator);
                `);
        snippet.toInfer("operator", "OperatorFunction<{}, number>");
        snippet.toInfer("result", "never");
      });

      it("should infer never from OperatorFunction<number, number>", () => {
        const snippet = expectSnippet(`
                    const operator = map<number, number>(() => 42);
                    const result = genericOperator(operator);
                `);
        snippet.toInfer("operator", "OperatorFunction<number, number>");
        snippet.toInfer("result", "never");
      });
    });
  }
});
