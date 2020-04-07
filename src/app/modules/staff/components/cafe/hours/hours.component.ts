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

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {


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
      fridayBlocks: [],
      saturdayBlocks: [],
      sundayBlocks: []
    };
  }


  selectHours(day: string, blocks: Array<Block>): void {
    const dialogRef = this.dialog.open(SelectTimeComponent, {
      data: { day: day, open: '', close: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("After close");
      console.log(result);

      if (result.day == 'Monday') {
        var block: Block = {
          open: result.open,
          close: result.close,
          day: result.day,
          id: 0
        }

        this.cafeHours.mondayBlocks.push(block);
      }

    });

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
}