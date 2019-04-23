/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-use-before-declare*/

import {
  Observable,
  Operator,
  OperatorFunction,
  Subject,
  Subscriber,
  TeardownLogic
} from "rxjs";

export function bucketBy<T>(
  count: number,
  hashSelector: (value: T, index: number) => number,
  subjectSelector: () => Subject<T> = () => new Subject<T>()
): OperatorFunction<T, Observable<T>[]> {
  return source =>
    source.lift(new BucketByOperator<T>(count, hashSelector, subjectSelector));
}

/*tslint:disable-next-line:no-unused-declaration*/
class BucketByOperator<T> implements Operator<T, Observable<T>[]> {
  constructor(
    private count: number,
    private hashSelector: (value: T, index: number) => number,
    private subjectSelector: () => Subject<T>
  ) {}
  call(subscriber: Subscriber<Observable<T>[]>, source: any): TeardownLogic {
    return source.subscribe(
      new BucketBySubscriber(
        subscriber,
        this.count,
        this.hashSelector,
        this.subjectSelector
      )
    );
  }
}

/*tslint:disable-next-line:no-unused-declaration*/
class BucketBySubscriber<T> extends Subscriber<T> {
  private buckets: Subject<T>[] | undefined;
  private index = 0;

  constructor(
    destination: Subscriber<Observable<T>[]>,
    private count: number,
    private hashSelector: (value: T, index: number) => number,
    private subjectSelector: () => Subject<T>
  ) {
    super(destination);
  }

  protected _next(value: T): void {
    const { closed, count, destination, hashSelector } = this;
    let { buckets } = this;
    if (closed) {
      return;
    }
    if (!buckets) {
      buckets = this.buckets = this._buckets();
      destination.next!(buckets.map(subject => subject.asObservable()));
    }
    let index: number;
    try {
      const hash = hashSelector(value, this.index++);
      index = Math.abs(Math.floor(hash)) % count;
    } catch (error) {
      this.error(error);
      return;
    }
    buckets[index].next(value);
  }

  protected _error(error: any): void {
    const { closed, destination } = this;
    let { buckets } = this;
    if (closed) {
      return;
    }
    if (!buckets) {
      buckets = this.buckets = this._buckets();
    }
    buckets.forEach(bucket => bucket.error(error));
    destination.error!(error);
  }

  protected _complete(): void {
    const { closed, destination } = this;
    let { buckets } = this;
    if (closed) {
      return;
    }
    if (!buckets) {
      buckets = this.buckets = this._buckets();
    }
    buckets.forEach(bucket => bucket.complete());
    destination.complete!();
  }

  private _buckets() {
    const { count, subjectSelector } = this;
    const buckets = new Array(count);
    for (let i = 0; i < count; ++i) {
      buckets[i] = subjectSelector();
    }
    return buckets;
  }
}
