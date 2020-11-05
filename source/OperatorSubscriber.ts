/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Subscriber } from "rxjs";

export class OperatorSubscriber<
  TSource,
  TDestination = TSource
> extends Subscriber<TSource> {
  constructor(
    destination: Subscriber<TSource>,
    handlers: {
      next?: undefined;
      error?: (error: unknown) => void;
      complete?: () => void;
    }
  );
  constructor(
    destination: Subscriber<TDestination>,
    handlers: {
      next: (value: TSource) => void;
      error?: (error: unknown) => void;
      complete?: () => void;
    }
  );
  constructor(
    destination: Subscriber<TSource | TDestination>,
    handlers: {
      next?: (value: TSource) => void;
      error?: (error: unknown) => void;
      complete?: () => void;
    }
  ) {
    super(destination);
    const { complete, error, next } = handlers;
    if (complete) {
      this._complete = () => {
        try {
          complete();
        } catch (caught: unknown) {
          destination.error(caught);
        }
        this.unsubscribe();
      };
    }
    if (error) {
      this._error = (received) => {
        try {
          error(received);
        } catch (caught: unknown) {
          destination.error(caught);
        }
        this.unsubscribe();
      };
    }
    if (next) {
      this._next = (value: TSource) => {
        try {
          next(value);
        } catch (caught: unknown) {
          destination.error(caught);
        }
      };
    }
  }
}
