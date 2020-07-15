import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderPlacingService } from "src/app/services/order-placing.service";
import { Router } from "@angular/router";
import { OrderItem } from "src/app/models/OrderItem";
import { HoursService } from "src/app/services/hours.service";
import { TimeUtilitiesService } from "src/app/services/time-utilities.service";
import { tap } from "rxjs/operators";
import { PickupTime } from 'src/app/models/PickupTime';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { CatalogService } from 'src/app/services/catalog.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { EditItemService } from 'src/app/services/edit-item.service';
import { PickupTimeSelectorSheet } from '../../pickup-time-selector-sheet/pickup-time-selector-sheet.component';

@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.component.html",
  styleUrls: ["./my-order.component.css"],
})
export class MyOrderComponent implements OnInit, OnDestroy {
  currentOrder: Order;
  public selectedTime: string;

  public availableTimes: Array<PickupTime>;
  private susbscriptions: Subscription;
  public darkThemeOn: boolean = false;

  constructor(
    private orderService: OrderPlacingService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    public timeUtils: TimeUtilitiesService,
    private themeService: ThemeService,
    private editService: EditItemService,
    private hoursService: HoursService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.susbscriptions = new Subscription();
    this.susbscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.currentOrder = this.orderService.order;

    this.hoursService.getAvailablePickupTimes().subscribe(times => this.availableTimes = times);

    if (this.currentOrder) this.selectedTime = this.currentOrder.pickupTime;
  }

  ngOnDestroy() {
    this.susbscriptions.unsubscribe();
  }

  public removeFromOrder(orderItem: OrderItem): void {
    this.orderService.remove(orderItem);
  }

  private timeSelected(time: string) {
    this.selectedTime = time;
    this.currentOrder.pickupTime = time;
  }

  public editItem(orderItem: OrderItem) {
    this.editService.setItemBeingEdited(orderItem);
    this.router.navigate(["user/cart/edit/" + orderItem.variationId]);
  }

  public getDollars(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if(indexOfDecimal == -1) return priceText;

    return priceText.substr(0, indexOfDecimal);
  }

  public getCents(price: number): string {
    var priceText: string = price.toString();
    var indexOfDecimal = priceText.indexOf(".");

    if(indexOfDecimal == -1) return "00";

    return priceText.substr(indexOfDecimal + 1, priceText.length).padEnd(2, "0");
  }

  public openTimeSelector(): void {
    let bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(PickupTimeSelectorSheet, {
      panelClass: "rounded-panel",
      data: {availableTimes: this.availableTimes, selectedTime: this.selectedTime}
    });

    bottomSheetRef.afterDismissed().subscribe(selectedTime => {
      if(selectedTime)
        this.timeSelected(selectedTime);
        this.changeDetector.detectChanges();
    });
  }
}
