import { Component, OnInit, Inject } from "@angular/core";
import { CafeHours } from "src/app/models/CafeHours";
import { Block } from "src/app/models/Block";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HoursService } from "src/app/services/hours.service";
import { LoadingService } from "src/app/services/loading.service";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { map, filter, tap } from 'rxjs/operators';

export class HoursGroup {
  section: string;
  hours: Array<string>;
}

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.css"],
})
export class HoursComponent implements OnInit {
  cafeHours: CafeHours;
  startDate: Date;
  endDate: Date;
  today: Date;
  dayNames: Array<string>;
  monthNames: Array<string>;

  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private timeService: HoursService,
    private loadingService: LoadingService,
    public utils: TimeUtilitiesService
  ) {}

  ngOnInit() {
    this.dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    this.monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July",
      "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    this.today = new Date();
    this.startDate = this.utils.getMonday(this.today);
    this.endDate = this.utils.getSunday(this.today);
    this.cafeHours = {
      mondayBlocks: [],
      tuesdayBlocks: [],
      wednesdayBlocks: [],
      thursdayBlocks: [],
      fridayBlocks: [],
      saturdayBlocks: [],
      sundayBlocks: [],
    };

    this.timeService
      .getBlocks(this.startDate.toDateString())
      .pipe(
        map(response => response["blocks"])
      )
      .subscribe(blocks => this.updateView(blocks));
  }

  nextWeek() {
    this.today.setDate(this.today.getDate() + 7);
    this.startDate = this.utils.getMonday(this.today);
    this.endDate = this.utils.getSunday(this.today);

    this.timeService
      .getBlocks(this.startDate.toDateString())
      .pipe(
        tap(() => this.clearTimes()),
        filter(response => response != null),
        map(response => response["blocks"])
      )
      .subscribe(blocks => this.updateView(blocks));
  }

  previousWeek() {
    this.today.setDate(this.today.getDate() - 7);
    this.startDate = this.utils.getMonday(this.today);
    this.endDate = this.utils.getSunday(this.today);

    this.timeService
      .getBlocks(this.startDate.toDateString())
      .pipe(
        tap(() => this.clearTimes()),
        filter(response => response != null),
        map(response => response["blocks"])
      )
      .subscribe(blocks => this.updateView(blocks));
  }

  updateView(blocks: Block[]): void {
    if(blocks) {

      blocks.forEach((block) => {
        if (block.day.substr(0, 3) == "Mon") this.cafeHours.mondayBlocks.push(block);
        else if (block.day.substr(0, 3) == "Tue") this.cafeHours.tuesdayBlocks.push(block);
        else if (block.day.substr(0, 3) == "Wed") this.cafeHours.wednesdayBlocks.push(block);
        else if (block.day.substr(0, 3) == "Thu") this.cafeHours.thursdayBlocks.push(block);
        else if (block.day.substr(0, 3) == "Fri") this.cafeHours.fridayBlocks.push(block);
        else if (block.day.substr(0, 3) == "Sat") this.cafeHours.saturdayBlocks.push(block);
        else if (block.day.substr(0, 3) == "Sun") this.cafeHours.sundayBlocks.push(block);
      });
    }
  }

  resetDate() {
    this.today = new Date();
    this.startDate = this.utils.getMonday(this.today);
    this.endDate = this.utils.getSunday(this.today);
  }

  selectHours(dayName: string, blocks: Array<Block>): void {


    const dialogRef = this.dialog.open(SelectTimeComponent, {
      data: { day: dayName, open: "", close: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null) return;

      this.timeService.postBlock(result, this.startDate.toDateString())
        .subscribe(
          (result) => {
            console.log(result);
            blocks.push(result);
        },
        error => console.error(error));


    });
  }


  editBlock(block: Block): void {
    const dialogRef = this.dialog.open(SelectTimeComponent, {
      data: {
        day: block.day,
        close: block.close,
        open: block.open,
        id: block.id,
      },
    });

    dialogRef.afterClosed().subscribe((editedBlock) => {
      if (editedBlock == null) return;

      if (block.open == editedBlock.open && block.close == editedBlock.close) return;


      this.loading = true;
      this.timeService
        .updateBlock(editedBlock)
        .subscribe(
          () => {
            this.loading = false;
            block.day = editedBlock.day;
            block.id = editedBlock.id;
            block.open = editedBlock.open;
            block.close = editedBlock.close;
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
        );
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
      sundayBlocks: [],
    };
  }

  public deleteBlock(block: Block, dayBlocks: Array<Block>): void {
    this.loading = true;

    this.timeService
      .deleteBlock(block.id)
      .subscribe(() => {
        var index: number = dayBlocks.indexOf(block);

        if (index != -1) dayBlocks.splice(index, 1);

        this.loading = false;
      });
  }
}

export class Time {
  hour: string;
  minutes: string;
  period: string = "PM";
}

@Component({
  selector: "select-time",
  templateUrl: "select-time.component.html",
  styleUrls: ["select-time.component.css"],
})
export class SelectTimeComponent implements OnInit {
  openTime: Time;
  closeTime: Time;
  openHourValid: boolean;
  closeHourValid: boolean;

  constructor(
    public dialogRef: MatDialogRef<SelectTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utils: TimeUtilitiesService
  ) {}

  ngOnInit() {
    this.openTime = new Time();
    this.closeTime = new Time();

    if (this.data.open) {
      this.openTime.hour = this.utils.parseHour(this.data.open) + "";
      this.openTime.minutes = this.utils.parseMinutes(this.data.open) + "";

      if (parseInt(this.openTime.hour) < 12) this.openTime.period = "AM";

      this.formatHour(this.openTime, this.openTime.hour);
      this.formatMinutes(this.openTime, this.openTime.minutes);
    }

    if (this.data.close) {
      this.closeTime.hour = this.utils.parseHour(this.data.close) + "";
      this.closeTime.minutes = this.utils.parseMinutes(this.data.close) + "";

      if (parseInt(this.closeTime.hour) < 12) this.closeTime.period = "AM";

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
    time.period == "PM" ? (time.period = "AM") : (time.period = "PM");
  }

  public validateHour(time: Time, newHour: string): void {
    if (newHour) {
      if (time == this.openTime) this.openHourValid = true;
      else this.closeHourValid = true;
    } else {
      if (time == this.openTime) this.openHourValid = false;
      else this.closeHourValid = false;
    }
  }

  public formatHour(time: Time, hour: string): void {
    this.validateHour(time, hour);

    if (hour) {
      var hourNumber = parseInt(hour);

      if (hourNumber > 12) hourNumber = hourNumber % 12;

      time.hour = (hourNumber + "").padStart(2, "0");
    }
  }

  public formatMinutes(time: Time, minutes: string): void {
    if (minutes) {
      var minutesNumber = parseInt(minutes);

      if (minutesNumber >= 60) minutesNumber = minutesNumber - 60;

      time.minutes = (minutesNumber + "").padStart(2, "0");
    } else {
      time.minutes = "00";
    }
  }

  public submit(): void {
    this.formatMinutes(this.openTime, this.openTime.minutes);
    this.formatMinutes(this.closeTime, this.closeTime.minutes);

    if (this.openTime.period == "PM") {
      var hourNumber = parseInt(this.openTime.hour);
      if (hourNumber != 12) this.openTime.hour = hourNumber + 12 + "";
    }

    if (this.closeTime.period == "PM") {
      var hourNumber = parseInt(this.closeTime.hour);
      if (hourNumber != 12) this.closeTime.hour = hourNumber + 12 + "";
    }

    if (this.openTime.period == "AM") {
      var hourNumber = parseInt(this.openTime.hour);
      if (hourNumber == 12) this.openTime.hour = "00";
    }

    if (this.closeTime.period == "AM") {
      var hourNumber = parseInt(this.closeTime.hour);
      if (hourNumber == 12) {
        this.closeTime.hour = "00";
      }
    }

    var block: Block = {
      open: this.openTime.hour + ":" + this.openTime.minutes,
      close: this.closeTime.hour + ":" + this.closeTime.minutes,
      day: this.data.day,
      id: this.data.id,
    };

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
