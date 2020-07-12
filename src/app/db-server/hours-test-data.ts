import { Block } from '../models/Block';
import { PickupSettings } from '../models/PickupSettings';
import { Time } from '../modules/staff/components/cafe/hours/hours.component';
import { PickupTime } from '../models/PickupTime';

export const BLOCKS: any = {
  "BLOCK ID 1": {
    open: "22:00",
    close: "23:00",
    day: "Monday",
    id: "BLOCK ID 1"
  },

  "BLOCK ID 2": {
    open: "8:00",
    close: "9:00",
    day: "Monday",
    id: "BLOCK ID 2"
  }
}

export const PICKUP_SETTINGS: PickupSettings = {
  id: "1",
  intervalBetweenPickupTimes: "10",
  pickupOnClose: true,
  pickupOnOpen: true
}

export const AVAILABLE_TIMES: Array<PickupTime> = [{ time: "10:10" }, { time: "10:20" }, { time: "10:30" }, { time: "10:40" }, { time: "10:50" }];
