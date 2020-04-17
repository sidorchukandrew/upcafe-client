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

  public appendComma(name: string, index: number, length: number): string {
    if (index < length - 1) return name + ", ";

    return name;
  }

  public convertTime(time: string): string {
    if (time == "ASAP") return time;

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12) hour -= 12;

    return hour + ":" + time.slice(indexOfColon + 1, time.length);
  }

  public extractTime(dateUTC: string): string {
    var date = new Date(dateUTC);

    if (date.getMinutes() < 10)
      return date.getHours() + ":0" + date.getMinutes();

    return date.getHours() + ":" + date.getMinutes();
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

  public getAvailablePickupTimes(blocks: Block[]): string[] {
    var incrementFactor: number = 10;
    var now: Date = new Date();

    var pickupTimes: string[] = [];

    blocks.forEach((block) => {
      var openHour: number = this.parseHour(block.open);
      var openMinutes: number = this.parseMinutes(block.open);

      var closeHour: number = this.parseHour(block.close);
      var closeMinutes: number = this.parseMinutes(block.close);

      var pickupHour: number = openHour;
      var pickupMinutes: number = openMinutes;

      // While the pickup hour consideration is less than when the cafe closes
      while (pickupHour < closeHour) {
        // Filter out all the times that have already passed
        // If the hour is already passed, move on
        if (now.getHours() > pickupHour) {
          pickupHour++;
        }
        // The pickup hour consideration is in this hour, so check the minutes
        else if (now.getHours() == pickupHour) {
          if (now.getMinutes() + incrementFactor >= pickupMinutes) {
            pickupMinutes = incrementFactor + pickupMinutes;

            if (pickupMinutes >= 60) {
              pickupMinutes = pickupMinutes % 60;
              pickupHour = pickupHour + 1;
            }
          } else {
            // USE THIS CONSIDERATION

            //PADDING THE MINUTES
            if (pickupMinutes < 10) {
              pickupTimes.push(pickupHour + ":" + pickupMinutes + "0");
            } else {
              pickupTimes.push(pickupHour + ":" + pickupMinutes);
            }

            pickupMinutes = incrementFactor + pickupMinutes;

            if (pickupMinutes >= 60) {
              pickupMinutes = pickupMinutes % 60;
              pickupHour = pickupHour + 1;
            }
          }
        }
        // The pickupHour consideration is less than close time
        else {
          //PADDING THE MINUTES
          if (pickupMinutes < 10) {
            pickupTimes.push(pickupHour + ":" + "0" + pickupMinutes);
          } else {
            pickupTimes.push(pickupHour + ":" + pickupMinutes);
          }

          pickupMinutes = incrementFactor + pickupMinutes;

          if (pickupMinutes >= 60) {
            pickupMinutes = pickupMinutes % 60;
            pickupHour = pickupHour + 1;
          }
        }
      }

      if (pickupHour == closeHour) {
        // Make sure that the pickup time isn't too near to the close time
        while (closeMinutes - incrementFactor >= pickupMinutes) {
          // If the pickup time consideration is before the current time, don't show it
          if (now.getHours() > pickupHour) {
            break;
          } else if (now.getHours() == pickupHour) {
            if (now.getMinutes() + incrementFactor >= pickupMinutes) {
              //DON'T SHOW IT
              pickupMinutes = pickupMinutes + incrementFactor;
            } else {
              //PADDING THE MINUTES
              if (pickupMinutes < 10) {
                pickupTimes.push(pickupHour + ":" + pickupMinutes + "0");
              } else {
                pickupTimes.push(pickupHour + ":" + pickupMinutes);
              }

              pickupMinutes = pickupMinutes + incrementFactor;
            }
          }

          // Use this pickupTime consideration
          else {
            //PADDING THE MINUTES
            if (pickupMinutes < 10) {
              pickupTimes.push(pickupHour + ":" + pickupMinutes + "0");
            } else {
              pickupTimes.push(pickupHour + ":" + pickupMinutes);
            }

            pickupMinutes = pickupMinutes + incrementFactor;
          }
        }
      }
    });
    return pickupTimes;
  }
}
