/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import {
  asyncScheduler,
  SchedulerAction,
  SchedulerLike,
  Subscription,
} from "rxjs";

type IdleDeadline = {
  didTimeout: boolean;
  timeRemaining(): number;
};
type IdleId = ReturnType<typeof setTimeout>;

declare function cancelIdleCallback(idleId: IdleId): void;
declare function requestIdleCallback(
  callback: (idleDeadline: IdleDeadline) => void,
  options?: { timeout?: number }
): IdleId;

class IdleAction<T> extends Subscription {
  constructor(private work: (this: SchedulerAction<T>, state?: T) => void) {
    super();
  }
  schedule(state?: T, delay?: number) {
    if (this.closed) {
      return this;
    }
    return idleScheduler.schedule(this.work, delay, state);
  }
}

const idleScheduler: SchedulerLike = {
  now() {
    return asyncScheduler.now();
  },
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription {
    if (delay) {
      return asyncScheduler.schedule(work, delay, state);
    }
    const action = new IdleAction(work);
    const id = requestIdleCallback(() => {
      try {
        work.call(action, state);
      } catch (error) {
        action.unsubscribe();
        throw error;
      }
    });
    action.add(() => cancelIdleCallback(id));
    return action;
  },
};
