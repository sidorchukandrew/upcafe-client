import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { HoursService } from 'src/app/services/hours.service';
import { PickupTime } from 'src/app/models/PickupTime';
import { Observable } from 'rxjs';
import { TimeUtilitiesService } from 'src/app/services/time-utilities.service';

@Component({
  selector: 'app-pickup-time-selector-sheet',
  templateUrl: './pickup-time-selector-sheet.component.html',
  styleUrls: ['./pickup-time-selector-sheet.component.css']
})
export class PickupTimeSelectorSheet implements OnInit {

  selectedTime: string;
  availableTimes: Array<PickupTime>;

  constructor(private bottomSheet: MatBottomSheetRef, private hoursService: HoursService,
    public timeUtils: TimeUtilitiesService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
    this.availableTimes = this.data.availableTimes;
    this.selectedTime = this.data.selectedTime;
  }

  public select(time: string): void {
    this.selectedTime = time;
  }

  public continue() {
    this.bottomSheet.dismiss(this.selectedTime);
  }

  public close() {
    this.bottomSheet.dismiss(null);
  }
}
