/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Scheduler } from "rxjs/Scheduler";
import { asap } from "rxjs/scheduler/asap";
import { EnterZoneScheduler } from "./EnterZoneScheduler";
import { Zone } from "./Zone";

export function enterZone(zone: Zone, scheduler: Scheduler = asap): Scheduler {
    return new EnterZoneScheduler(zone, scheduler) as any;
}
