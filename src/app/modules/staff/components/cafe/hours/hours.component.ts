import { Component, OnInit } from '@angular/core';
import { Hours } from 'src/app/models/Hours';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  hours: Array<string>;
  pmHours: Array<string>;
  amHours: Array<string>;
  days: Array<string>;
  selected: Hours;
  openSelected: boolean;
  closeSelected: boolean;
  selectedHours: Array<Hours>;
  transferringToPm: boolean
  transferOccured: boolean;

  constructor() {

    this.openSelected = false;
    this.closeSelected = false;
    this.transferringToPm = false;
    this.transferOccured = false;
    this.selected = {
      open: '0:00',
      close: '0:00',
      day: ''
    }
    this.hours = ['8:00', '8:30',
      '9:00', '9:30',
      '10:00', '10:30',
      '11:00', '11:30',
      '12:00', '12:30',
      '13:00', '13:30',
      '14:00', '14:30',
      '15:00', '15:30',
      '16:00', '16:30',
      '17:00', '17:30',
      '18:00', '18:30',
      '19:00', '19:30',
      '20:00', '20:30',
      '21:00', '21:30',
      '22:00', '22:30',
      '23:00', '23:30',];

    this.amHours = [
      '8:00', '8:30',
      '9:00', '9:30',
      '10:00', '10:30',
      '11:00', '11:30',
    ]

    this.pmHours = [
      '12:00', '12:30',
      '13:00', '13:30',
      '14:00', '14:30',
      '15:00', '15:30',
      '16:00', '16:30',
      '17:00', '17:30',
      '18:00', '18:30',
      '19:00', '19:30',
      '20:00', '20:30',
      '21:00', '21:30',
      '22:00', '22:30',
      '23:00', '23:30',
    ];

    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  ngOnInit() {
  }

  timeSelected(hour: string, section: string) {
    if (!this.openSelected) {
      this.openSelected = true;
      this.selected.open = hour;
    }
    else {
      this.closeSelected = true;
      this.selected.close = hour;
    }

    console.log(this.selected);
  }

  convertTime(time: string): string {

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12)
      hour -= 12;

    return (hour + ":" + time.slice(indexOfColon + 1, time.length));
  }

  isInBetween(openTime: string, closeTime: string) {

  }

  selectDay(day: string) {
    this.selected.day = day;
  }

  timeWithinOpenAndClose(time: string): boolean {

    // If a close time has been selected
    if (this.selected.close != '0:00') {
      var indexOfColon = time.indexOf(":");

      var hourInQuestion = this.parseHour(time);
      var minutesInQuestion = this.parseMinutes(time);

      var hourOpen = this.parseHour(this.selected.open);
      var minutesOpen = this.parseMinutes(this.selected.open);

      var hourClose = this.parseHour(this.selected.close);
      var minutesClose = this.parseMinutes(this.selected.close);

      if (hourOpen < hourInQuestion && hourInQuestion < hourClose)
        return true;
      else if (hourOpen == hourInQuestion) {
        return (minutesOpen < minutesInQuestion);
      }
      else if (hourClose == hourInQuestion) {
        if (time == this.selected.close)
          return true;
        return (minutesInQuestion < minutesClose);
      }
    }

    return false;
  }

  parseHour(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(0, indexOfColon));
  }

  parseMinutes(time: string): number {
    var indexOfColon = time.indexOf(":");
    return parseInt(time.slice(indexOfColon + 1, time.length));
  }
}
