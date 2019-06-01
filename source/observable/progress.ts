/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs";

export interface ProgressState {
  complete: number;
  total: number;
}

export function progress<
  O extends Observable<any>[],
  C extends (...obervables: O) => Observable<any>
>(
  creator: C,
  ...obervables: O
): Observable<[ReturnType<C>, Observable<ProgressState>]> {
  throw new Error("Not implemented.");
}
