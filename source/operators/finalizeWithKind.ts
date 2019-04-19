/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { CloseKind } from "../kinds";
import { defer, MonoTypeOperatorFunction } from "rxjs";
import { finalize, tap } from "rxjs/operators";

export function finalizeWithKind<T>(
  callback: (kind: CloseKind) => void
): MonoTypeOperatorFunction<T> {
  return source =>
    defer(() => {
      let kind: CloseKind = "U";
      return source.pipe(
        tap({
          complete: () => (kind = "C"),
          error: () => (kind = "E")
        }),
        finalize(() => callback(kind))
      );
    });
}
