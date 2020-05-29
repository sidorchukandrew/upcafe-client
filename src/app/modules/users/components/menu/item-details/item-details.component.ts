import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModListDetailsComponent } from "../mod-list-details/mod-list-details.component";
import { CustomerOrderService } from "src/app/services/customer-order.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SelectedItemStore } from "src/app/stores/selected-item.store";
import { Subscription, noop, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { HoursService } from "src/app/services/hours.service";
import { MenuItem } from 'src/app/models/MenuItem';
import { ModifierList } from 'src/app/models/ModifierList';

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(ModListDetailsComponent, { static: false })
  private modListDetailsComponent: ModListDetailsComponent;

  totalItemPrice: number;
  priceDollars: number;
  priceCents: any;
  currentCents: number;
  selectedModifierList: ModifierList;
  subscriptions: Subscription;
  item: MenuItem;
  orderState$: Observable<string>;
  timesAvailable: boolean = false;

  constructor(
    private itemStore: SelectedItemStore,
    private orderService: CustomerOrderService,
    public userResponseDialog: MatDialog,
    private router: Router,
    private hoursService: HoursService
  ) {}

  ngOnInit() {
    this.orderState$ = this.orderService.state$;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.itemStore.currentItem$
        .pipe(
          tap((item) => (item ? noop : this.router.navigate(["user/menu/"]))),
          tap((item) => this.parsePrice(item.price)),
          tap((item) => (this.item = item))
        )
        .subscribe()
    );

    this.subscriptions.add(this.orderState$.subscribe());

    this.hoursService
      .getAvailablePickupTimes()
      .pipe(map((available) => available["availableTimes"]))
      .subscribe((times) => {
        this.timesAvailable = times.length > 0;
      });

    this.totalItemPrice = this.item.price;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addToPrice(price: number) {
    this.totalItemPrice = this.totalItemPrice + price;
  }

  parsePrice(price: number): void {
    var index: number = price.toString().indexOf(".");

    if (index != -1) {
      this.priceDollars = parseInt(price.toString().substr(0, index));
      this.priceCents = parseInt(
        price.toString().substr(index + 1, price.toString().length)
      );
    } else {
      this.priceDollars = price;
      this.priceCents = "00";
    }
  }

  public addToOrder(): void {
    var selectedModifiers;

    if (this.modListDetailsComponent)
      selectedModifiers = this.modListDetailsComponent.getSelectedModifiers();

    var orderItem = this.orderService.newOrderItem(this.item, selectedModifiers, this.totalItemPrice);
    this.orderService.addToOrder(orderItem);

    // this.userResponseDialog.open(UserResponseDialog, {
    //   hasBackdrop: true,
    // });
  }
}

// @Component({
//   selector: "user-response-dialog",
//   templateUrl: "user-response-dialog.html",
//   styleUrls: ["user-response-dialog.css"],
// })
// export class UserResponseDialog implements OnInit {
//   constructor(
//     public dialogRef: MatDialogRef<UserResponseDialog>,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     window.navigator.vibrate(200);
//     setTimeout(() => this.dialogRef.close(), 1000);
//   }

//   close(): void {
//     this.dialogRef.close();
//   }

//   viewOrder(): void {
//     this.router.navigate(["user/cart"]);
//     this.close();
//   }
// }


  // async counter(start: number, end: number, durationMs: number) {
  //   var delayTime: number = durationMs / (end - start);

  //   while (start < end) {
  //     start = start + 1;
  //     this.currentCents = start;
  //     await this.delay(delayTime);
  //   }
  // }

  // private delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
