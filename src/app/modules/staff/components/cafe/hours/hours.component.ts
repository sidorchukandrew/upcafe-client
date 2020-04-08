import { Component, OnInit, Inject } from '@angular/core';
import { CafeHours } from 'src/app/models/CafeHours';
import { Block } from 'src/app/models/Block';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { OrderFeedService } from 'src/app/services/order-feed.service';
import { parse } from 'querystring';

export class HoursGroup {
  section: string;
  hours: Array<string>;
}

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  cafeHours: CafeHours;
  standardHours: CafeHours;
  startDate: Date;
  endDate: Date;
  today: Date;
  dayNames: Array<string>;
  monthNames: Array<string>;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {

    this.dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'];
    this.today = new Date();
    this.startDate = this.getMonday(this.today);
    this.endDate = this.getSunday(this.today);
    this.cafeHours = {
      mondayBlocks: [],
      tuesdayBlocks: [],
      wednesdayBlocks: [],
      thursdayBlocks: [],
      fridayBlocks: [],
      saturdayBlocks: [],
      sundayBlocks: []
    };

    this.standardHours = {
      mondayBlocks: [],
      tuesdayBlocks: [],
      wednesdayBlocks: [],
      thursdayBlocks: [],
      fridayBlocks: [{
        close: '23:00',
        open: '22:00',
        id: 1,
        day: 'Friday'
      }],
      saturdayBlocks: [{
        close: '9:00',
        open: '8:00',
        id: 0,
        day: 'Saturday'
      }],
      sundayBlocks: []
    };
  }

  getMonday(d): Date {
    var day = d.getDay();
    var diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getSunday(d): Date {
    var dayOfTheWeek = d.getDay();
    var diff = 7 - dayOfTheWeek;
    var date = d.getDate();
    var sundaysDate = date + diff;
    return new Date(d.setDate(sundaysDate));
  }

  nextWeek() {
    this.today.setDate(this.today.getDate() + 7);
    this.startDate = this.getMonday(this.today);
    this.endDate = this.getSunday(this.today);
  }

  previousWeek() {
    this.today.setDate(this.today.getDate() - 7);
    this.startDate = this.getMonday(this.today);
    this.endDate = this.getSunday(this.today);
  }

  resetDate() {
    this.today = new Date();
    this.startDate = this.getMonday(this.today);
    this.endDate = this.getSunday(this.today);
  }


  pushBlock(result: Block): void {

    if (result.day == 'Monday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.mondayBlocks.push(block);
    }

    else if (result.day == 'Tuesday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.tuesdayBlocks.push(block);
    }

    else if (result.day == 'Wednesday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.wednesdayBlocks.push(block);
    }

    else if (result.day == 'Thursday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.thursdayBlocks.push(block);
    }


    else if (result.day == 'Friday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.fridayBlocks.push(block);
    }


    else if (result.day == 'Saturday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.saturdayBlocks.push(block);
    }

    else if (result.day == 'Sunday') {
      var block: Block = {
        open: result.open,
        close: result.close,
        day: result.day,
        id: 0
      }

      this.cafeHours.sundayBlocks.push(block);
    }
  }

  selectHours(day: string, blocks: Array<Block>): void {
    const dialogRef = this.dialog.open(SelectTimeComponent, {
      data: { day: day, open: '', close: '' },
      minWidth: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == null)
        return;

      blocks.push(result);
    });

  }

  setStandardTimes(): void {

    this.clearTimes();

    this.standardHours.mondayBlocks.forEach(block => {
      this.cafeHours.mondayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });
    this.standardHours.tuesdayBlocks.forEach(block => {
      this.cafeHours.tuesdayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });
    this.standardHours.wednesdayBlocks.forEach(block => {
      this.cafeHours.wednesdayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });

    this.standardHours.thursdayBlocks.forEach(block => {
      this.cafeHours.thursdayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });

    this.standardHours.fridayBlocks.forEach(block => {
      this.cafeHours.fridayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });

    this.standardHours.saturdayBlocks.forEach(block => {
      this.cafeHours.saturdayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });

    this.standardHours.sundayBlocks.forEach(block => {
      this.cafeHours.sundayBlocks.push({
        close: block.close,
        open: block.open,
        id: block.id,
        day: block.day
      });
    });
  }

  editBlock(block: Block): void {
    const dialogRef = this.dialog.open(SelectTimeComponent, {
      data: {
        day: block.day, close: block.close, open: block.open
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

      block.id = result.id;
      block.open = result.open;
      block.close = result.close;
      block.day = result.day;
      console.log(result);
    });

  }


  clearTimes(): void {
    this.cafeHours = {
      mondayBlocks: [],
      tuesdayBlocks: [],
      wednesdayBlocks: [],
      thursdayBlocks: [],
      fridayBlocks: [],
      saturdayBlocks: [],
      sundayBlocks: []
    }
  }

  deleteBlock(block: Block, dayBlocks: Array<Block>): void {
    var index: number = dayBlocks.indexOf(block);

    if (index != -1)
      dayBlocks.splice(index, 1);

    console.log(this.standardHours);
  }
}

export class Time {
  hour: string;
  minutes: string;
  period: string = 'PM';
}

@Component({
  selector: 'select-time',
  templateUrl: 'select-time.component.html',
  styleUrls: ['select-time.component.css']
})
export class SelectTimeComponent implements OnInit {

  openTime: Time;
  closeTime: Time;
  openHourValid: boolean;
  closeHourValid: boolean;

  constructor(
    public dialogRef: MatDialogRef<SelectTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ordersFeed: OrderFeedService) {

  }

  ngOnInit() {
    this.openTime = new Time();
    this.closeTime = new Time();

    if (this.data.open) {
      this.openTime.hour = this.ordersFeed.parseHour(this.data.open) + '';
      this.openTime.minutes = this.ordersFeed.parseMinutes(this.data.open) + '';

      this.formatHour(this.openTime, this.openTime.hour);
      this.formatMinutes(this.openTime, this.openTime.minutes);
    }

    if (this.data.close) {
      this.closeTime.hour = this.ordersFeed.parseHour(this.data.close) + '';
      this.closeTime.minutes = this.ordersFeed.parseMinutes(this.data.close) + '';

      this.formatHour(this.closeTime, this.closeTime.hour);
      this.formatMinutes(this.closeTime, this.closeTime.minutes);
    }


    this.openHourValid = true;
    this.closeHourValid = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  public togglePeriod(time: Time): void {
    (time.period == 'PM') ? time.period = 'AM' : time.period = 'PM';
  }

  public validateHour(time: Time, newHour: string): void {

    console.log(newHour);

    if (newHour) {
      if (time == this.openTime)
        this.openHourValid = true;
      else
        this.closeHourValid = true;
    }

    else {
      if (time == this.openTime)
        this.openHourValid = false;
      else
        this.closeHourValid = false;
    }
  }

  public formatHour(time: Time, hour: string): void {

    this.validateHour(time, hour);

    if (hour) {

      var hourNumber = parseInt(hour);

      if (hourNumber > 12)
        hourNumber = hourNumber % 12;

      time.hour = (hourNumber + "").padStart(2, '0');
    }

  }

  public formatMinutes(time: Time, minutes: string): void {

    if (minutes) {

      var minutesNumber = parseInt(minutes);

      if (minutesNumber >= 60)
        minutesNumber = minutesNumber - 60;

      time.minutes = (minutesNumber + "").padStart(2, '0');
    }

    else {
      time.minutes = "00";
    }
  }

  public addBlock(): void {
    this.formatMinutes(this.openTime, this.openTime.minutes);
    this.formatMinutes(this.closeTime, this.closeTime.minutes);

    console.log(this.openTime);
    console.log(this.closeTime);

    if (this.openTime.period == 'PM') {
      var hourNumber = parseInt(this.openTime.hour);
      if (hourNumber != 12)
        this.openTime.hour = hourNumber + 12 + '';
    }

    if (this.closeTime.period == 'PM') {
      var hourNumber = parseInt(this.closeTime.hour);
      if (hourNumber != 12)
        this.closeTime.hour = hourNumber + 12 + '';
    }

    if (this.openTime.period == 'AM') {
      var hourNumber = parseInt(this.openTime.hour);
      if (hourNumber == 12)
        this.openTime.hour = '00';
    }

    if (this.closeTime.period == 'AM') {
      var hourNumber = parseInt(this.closeTime.hour);
      if (hourNumber == 12) {
        this.closeTime.hour = '00';
      }
    }

    var block: Block = {
      open: this.openTime.hour + ":" + this.openTime.minutes,
      close: this.closeTime.hour + ":" + this.closeTime.minutes,
      day: this.data.day,
      id: 0
    }

    this.dialogRef.close(block);
  }
}

  // isAfter(startTime: string, timeOption: string): boolean {
  //   var startHour: number = this.ordersFeed.parseHour(startTime);
  //   var optionHour: number = this.ordersFeed.parseHour(timeOption);

  //   // The close time in question is before the open time
  //   if (startHour > optionHour)
  //     return false;

  //   // The close time option and the open time have the same hour, so compare minutes
  //   if (startHour == optionHour) {

  //     var startMinutes: number = this.ordersFeed.parseMinutes(startTime);
  //     var optionMinutes: number = this.ordersFeed.parseMinutes(timeOption);

  //     if (startMinutes >= optionMinutes)
  //       return false;

  //     return true;
  //   }

  //   return true;
  // }