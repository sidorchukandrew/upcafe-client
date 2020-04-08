import { Component, OnInit, Inject } from '@angular/core';
import { CafeHours } from 'src/app/models/CafeHours';
import { Block } from 'src/app/models/Block';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { OrderFeedService } from 'src/app/services/order-feed.service';

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
    })
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


@Component({
  selector: 'select-time',
  templateUrl: 'select-time.component.html',
  styleUrls: ['select-time.component.css']
})
export class SelectTimeComponent implements OnInit {

  pmHours: HoursGroup;
  amHours: HoursGroup;

  openControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<SelectTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ordersFeed: OrderFeedService) {

  }

  ngOnInit() {

    this.openControl = new FormControl();
    this.amHours = {
      section: 'AM',
      hours: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']
    };

    this.pmHours = {
      section: 'PM',
      hours: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
        '23:00', '23:30', '24:00']
    };
  }

  cancel(): void {
    this.dialogRef.close();
  }


  add(open: string, close: string): void {
    this.data.open = open;
    this.data.close = close;
    this.dialogRef.close({
      day: this.data.day,
      open: open,
      close: close
    });
  }

  convertTime(time: string): string {

    var indexOfColon = time.indexOf(":");
    var hour = parseInt(time.slice(0, indexOfColon));

    if (hour > 12)
      hour -= 12;

    return (hour + ":" + time.slice(indexOfColon + 1, time.length));
  }

  isAfter(startTime: string, timeOption: string): boolean {
    var startHour: number = this.ordersFeed.parseHour(startTime);
    var optionHour: number = this.ordersFeed.parseHour(timeOption);

    // The close time in question is before the open time
    if (startHour > optionHour)
      return false;

    // The close time option and the open time have the same hour, so compare minutes
    if (startHour == optionHour) {

      var startMinutes: number = this.ordersFeed.parseMinutes(startTime);
      var optionMinutes: number = this.ordersFeed.parseMinutes(timeOption);

      if (startMinutes >= optionMinutes)
        return false;

      return true;
    }

    return true;
  }
}