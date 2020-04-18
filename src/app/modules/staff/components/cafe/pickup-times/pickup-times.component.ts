import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { PickupSettings } from "src/app/models/PickupSettings";
import { HoursService } from "src/app/services/hours.service";
import { MatSlideToggleChange } from "@angular/material";
import { Subject, BehaviorSubject, Observable, Subscription } from "rxjs";
import { tap, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-pickup-times",
  templateUrl: "./pickup-times.component.html",
  styleUrls: ["./pickup-times.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class PickupTimesComponent implements OnInit, OnDestroy {

  settings: PickupSettings;
  private subject = new Subject<PickupSettings>();
  private settingsUpdate$: Observable<PickupSettings> = this.subject.asObservable();

  subscriptions: Subscription;

  constructor(private hoursService: HoursService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.hoursService.getPickupSettings().subscribe((settings) => {
      this.settings = settings;
      this.settings.intervalBetweenPickupTimes = this.settings.intervalBetweenPickupTimes + "";
    });


   this.subscriptions.add(this.settingsUpdate$
      .pipe(
        debounceTime(1000),
        tap((settings) => this.hoursService.updatePickupSettings(settings).subscribe())
      ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  pickupOnOpenChange(event: MatSlideToggleChange) {
    this.settings.pickupOnOpen = event.checked;

    this.subject.next(this.settings);
  }

  pickupOnCloseChange(event: MatSlideToggleChange) {
    this.settings.pickupOnClose = event.checked;

    this.subject.next(this.settings);
  }

  intervalChange(newInterval: string) {
    this.settings.intervalBetweenPickupTimes = newInterval;

    this.subject.next(this.settings);
  }

}
