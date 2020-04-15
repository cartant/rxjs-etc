/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
  Observable,
  Operator,
  OperatorFunction,
  Subscriber,
  TeardownLogic,
} from "rxjs";

export function dispose<T>(callback: () => void): OperatorFunction<T, T> {
  return (source: Observable<T>) => source.lift(new DisposeOperator(callback));
}

class DisposeOperator<T> implements Operator<T, T> {
  constructor(private callback: () => void) {}
  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(new DisposeSubscriber(subscriber, this.callback));
  }
}

class DisposeSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, private callback?: () => void) {
    super(destination);
  }
  unsubscribe() {
    super.unsubscribe();
    const { callback } = this;
    if (callback) {
      callback();
      this.callback = undefined;
    }
  }
}
