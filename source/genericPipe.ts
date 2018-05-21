/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
    MonoTypeOperatorFunction,
    Observable,
    pipe as _pipe,
    UnaryFunction
} from "rxjs";

export function genericPipe<T>(...operators: MonoTypeOperatorFunction<T>[]): <R extends T>(source: Observable<R>) => Observable<R>;
export function genericPipe<T>(...operators: UnaryFunction<T, T>[]): <R extends T>(source: R) => R;
export function genericPipe<T, A>(op1: UnaryFunction<T, A>): UnaryFunction<T, A>;
export function genericPipe<T, A, B>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>): UnaryFunction<T, B>;
export function genericPipe<T, A, B, C>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>): UnaryFunction<T, C>;
export function genericPipe<T, A, B, C, D>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>, op4: UnaryFunction<C, D>): UnaryFunction<T, D>;
export function genericPipe<T, A, B, C, D, E>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>, op4: UnaryFunction<C, D>, op5: UnaryFunction<D, E>): UnaryFunction<T, E>;
export function genericPipe<T, A, B, C, D, E, F>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>, op4: UnaryFunction<C, D>, op5: UnaryFunction<D, E>, op6: UnaryFunction<E, F>): UnaryFunction<T, F>;
export function genericPipe<T, A, B, C, D, E, F, G>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>, op4: UnaryFunction<C, D>, op5: UnaryFunction<D, E>, op6: UnaryFunction<E, F>, op7: UnaryFunction<F, G>): UnaryFunction<T, G>;
export function genericPipe<T, A, B, C, D, E, F, G, H>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>, op4: UnaryFunction<C, D>, op5: UnaryFunction<D, E>, op6: UnaryFunction<E, F>, op7: UnaryFunction<F, G>, op8: UnaryFunction<G, H>): UnaryFunction<T, H>;
export function genericPipe<T, A, B, C, D, E, F, G, H, I>(op1: UnaryFunction<T, A>, op2: UnaryFunction<A, B>, op3: UnaryFunction<B, C>, op4: UnaryFunction<C, D>, op5: UnaryFunction<D, E>, op6: UnaryFunction<E, F>, op7: UnaryFunction<F, G>, op8: UnaryFunction<G, H>, op9: UnaryFunction<H, I>): UnaryFunction<T, I>;
export function genericPipe<T, R>(...operators: UnaryFunction<any, any>[]): UnaryFunction<T, R>;
export function genericPipe<T, R>(...operators: UnaryFunction<any, any>[]): UnaryFunction<T, R> {
    return _pipe.apply(undefined, operators);
}

export const pipe = genericPipe;
