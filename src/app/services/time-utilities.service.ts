import { Injectable } from "@angular/core";
import { Order } from "../models/Order";
import { Block } from "../models/Block";

@Injectable({
  providedIn: "root",
})
export class TimeUtilitiesService {
  constructor() {}

  public increasingTime(a: Order, b: Order): number {
    // If they're both ASAP, they have the same index
    if (a.pickupTime == "ASAP" && b.pickupTime == "ASAP") return 0;

    // Maybe one of them is ASAP, if so return which one should be first
    if (a.pickupTime == "ASAP") {
      return -1;
    }

    if (b.pickupTime == "ASAP") {
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
    minutesA = parseInt(
      a.pickupTime.slice(indexOfColon + 1, a.pickupTime.length)
    );

    var minutesB: number;
    var indexOfColon = b.pickupTime.indexOf(":");
    minutesB = parseInt(
      b.pickupTime.slice(indexOfColon + 1, b.pickupTime.length)
    );

    return minutesA - minutesB;
  }
  public increasingTimeBlocks(a: Block, b: Block): number {
    // None of them are ASAP, compare the hours
    var hourA: number;
    var indexOfColon = a.open.indexOf(":");
    hourA = parseInt(a.open.slice(0, indexOfColon));

    var hourB: number;
    var indexOfColon = b.open.indexOf(":");
    hourB = parseInt(b.open.slice(0, indexOfColon));

    return hourA - hourB;
  }

  public parseHour(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(0, indexOfColon));
  }

  public parseMinutes(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(indexOfColon + 1, time.length));
  }

  public convertTime(time: string): string {
    if (time == "ASAP") return time;

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12) hour -= 12;

    return hour + ":" + time.slice(indexOfColon + 1, time.length);
  }

  public appendPeriod(time: string): string {
    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour >= 12) return "PM";

    return "AM";
  }

  public getMonday(d: Date): Date {
    var day = d.getDay();
    var diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  public getSunday(d): Date {
    var dayOfTheWeek = d.getDay();
    var diff = 7 - dayOfTheWeek;
    var date = d.getDate();
    var sundaysDate = date + diff;
    return new Date(d.setDate(sundaysDate));
  }

  public getDayBasedOnNumber(numberDay: number): string {
    switch (numberDay) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }
}
