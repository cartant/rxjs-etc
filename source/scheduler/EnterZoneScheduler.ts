/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Scheduler } from "rxjs/Scheduler";
import { Subscription } from "rxjs/Subscription";
import { Zone } from "./Zone";

export class EnterZoneScheduler {

    constructor(
        private zone: Zone,
        private scheduler: Scheduler
    ) {}

    schedule(...args: any[]): Subscription {
        return this.zone.run(() => this.scheduler.schedule.apply(
            this.scheduler,
            args
        ));
    }
}
