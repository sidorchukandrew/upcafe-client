import { Component, OnInit } from '@angular/core';
import { Hours } from 'src/app/models/Hours';
import { CafeHours } from 'src/app/models/CafeHours';
import { Block } from 'src/app/models/Block';

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
  selected: Block;
  openSelected: boolean;
  closeSelected: boolean;
  transferringToPm: boolean
  transferOccured: boolean;

  cafeHours: CafeHours;
  cols: number;

  constructor() {

    this.openSelected = false;
    this.closeSelected = false;
    this.transferringToPm = false;
    this.transferOccured = false;
    this.cols = 1;
  }

  ngOnInit() {

    this.cafeHours = {
      mondayBlocks: new Array<Block>(),
      tuesdayBlocks: new Array<Block>(),
      wednesdayBlocks: new Array<Block>(),
      thursdayBlocks: new Array<Block>(),
      fridayBlocks: new Array<Block>(),
      saturdayBlocks: new Array<Block>(),
      sundayBlocks: new Array<Block>(),
    }

    this.selected = {
      open: '0:00',
      close: '0:00',
      day: '',
      id: Date.now()
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

  stageHours(): void {

    if (this.selected.day == 'Monday')
      this.cafeHours.mondayBlocks.push(this.selected);

    else if (this.selected.day == 'Tuesday')
      this.cafeHours.tuesdayBlocks.push(this.selected);

    else if (this.selected.day == 'Wednesday')
      this.cafeHours.wednesdayBlocks.push(this.selected);

    else if (this.selected.day == 'Thursday')
      this.cafeHours.thursdayBlocks.push(this.selected);

    else if (this.selected.day == 'Friday')
      this.cafeHours.fridayBlocks.push(this.selected);

    else if (this.selected.day == 'Saturday')
      this.cafeHours.saturdayBlocks.push(this.selected);

    else
      this.cafeHours.sundayBlocks.push(this.selected);

    console.log(this.cafeHours);

    this.selected = {
      open: '0:00',
      close: '0:00',
      day: '',
      id: Date.now()
    }

    this.openSelected = false;
  }

  removeBlock(block: Block, dayBlocks: Array<Block>): void {
    var index = dayBlocks.indexOf(block);

    if (index != -1)
      dayBlocks.splice(index, 1);

    console.log(dayBlocks);
  }
}
