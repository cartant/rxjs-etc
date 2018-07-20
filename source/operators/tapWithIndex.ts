/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { defer, MonoTypeOperatorFunction, PartialObserver } from "rxjs";
import { tap } from "rxjs/operators";

export function tapWithIndex<T>(
    next?: (tuple: [T, number]) => void,
    error?: (error: any) => void,
    complete?: () => void
): MonoTypeOperatorFunction<T>;
export function tapWithIndex<T>(
    observer: PartialObserver<[T, number]>
): MonoTypeOperatorFunction<T>;
export function tapWithIndex<T>(
    nextOrObserver?: ((tuple: [T, number]) => void) | PartialObserver<[T, number]>,
    error?: (error: any) => void,
    complete?: () => void
): MonoTypeOperatorFunction<T> {
    return source => defer(() => {
        /*tslint:disable-next-line:no-unused-declaration*/
        let index = -1;
        const observer = nextOrObserver && (typeof nextOrObserver !== "function") ?
            { next: () => {}, ...nextOrObserver } :
            { complete, error, next: nextOrObserver || (() => {}) };
        return source.pipe(
            tap<T>({ ...observer, next: value => observer.next([value, ++index]) })
        );
    });
}
