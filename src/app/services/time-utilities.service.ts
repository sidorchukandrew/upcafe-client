import { Injectable } from '@angular/core';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class TimeUtilitiesService {

  constructor() { }

  public increasingTime(a: Order, b: Order): number {

    // If they're both ASAP, they have the same index
    if (a.pickupTime == 'ASAP' && b.pickupTime == 'ASAP')
      return 0;

    // Maybe one of them is ASAP, if so return which one should be first
    if (a.pickupTime == 'ASAP') {
      return -1;
    }

    if (b.pickupTime == 'ASAP') {
      return 1;
    }

    // None of them are ASAP, compare the hours
    var hourA: number;
    var indexOfColon = a.pickupTime.indexOf(":");
    hourA = parseInt(a.pickupTime.slice(0, indexOfColon));

    var hourB: number;
    var indexOfColon = b.pickupTime.indexOf(":");
    hourB = parseInt(b.pickupTime.slice(0, indexOfColon));

    if (hourA != hourB) {
      return hourA - hourB;
    }

    // The hours were the same, so compare the minutes
    var minutesA: number;
    var indexOfColon = a.pickupTime.indexOf(":");
    minutesA = parseInt(a.pickupTime.slice(indexOfColon + 1, a.pickupTime.length));

    var minutesB: number;
    var indexOfColon = b.pickupTime.indexOf(":");
    minutesB = parseInt(b.pickupTime.slice(indexOfColon + 1, b.pickupTime.length));

    return minutesA - minutesB;
  }

  public parseHour(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(0, indexOfColon));
  }

  public parseMinutes(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(indexOfColon + 1, time.length));
  }

  public appendComma(name: string, index: number, length: number): string {

    if (index < length - 1)
      return name + ", ";

    return name;
  }

  public convertTime(time: string): string {

    if (time == 'ASAP')
      return time;

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12)
      hour -= 12;

    return (hour + ":" + time.slice(indexOfColon + 1, time.length));
  }

  public extractTime(dateUTC: string): string {

    var date = new Date(dateUTC);

    if (date.getMinutes() < 10)
      return date.getHours() + ":0" + date.getMinutes();

    return date.getHours() + ":" + date.getMinutes();
  }
}
