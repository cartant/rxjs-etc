/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { IScheduler, Scheduler } from "rxjs/Scheduler";
import { Subscription } from "rxjs/Subscription";
import { Zone } from "./Zone";

export class LeaveZoneScheduler {

    constructor(
        private zone: Zone,
        private scheduler: IScheduler
    ) {}

    schedule(...args: any[]): Subscription {
        return this.zone.runOutsideAngular(() => this.scheduler.schedule.apply(
            this.scheduler,
            args
        ));
    }
}
