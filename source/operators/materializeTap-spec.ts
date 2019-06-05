/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { marbles } from "rxjs-marbles";
import { materializeTap } from "./materializeTap";

describe("materializeTap", () => {
  it("should tap into next", marbles(m => {}));

  it("should tap into error", marbles(m => {}));

  it("should tap into complete", marbles(m => {}));
});
