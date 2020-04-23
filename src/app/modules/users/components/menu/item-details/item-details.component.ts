import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { LineItem } from "src/app/models/LineItem";
import { ModifierListData } from "src/app/models/ModifierListData";
import { ActivatedRoute, Router } from "@angular/router";
import { ModListDetailsComponent } from "../mod-list-details/mod-list-details.component";
import { OrderService } from "src/app/services/order.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SelectedItemStore } from "src/app/services/stores/selected-item.store";
import { Subscription, noop, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { VariationData } from "src/app/models/VariationData";

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
  nameOfCurrentlySelectedModifierList: string;
  subscriptions: Subscription;
  item: LineItem;
  orderState$: Observable<string>;

  constructor(
    private itemStore: SelectedItemStore,
    private orderService: OrderService,
    public userResponseDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderState$ = this.orderService.state$;
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.itemStore.currentItem$
        .pipe(
          tap((item) => (item ? noop : this.router.navigate(["user/menu/"]))),
          tap((item) => this.parsePrice(item.variationData.variationPrice)),
          tap((item) => (this.item = item))
        )
        .subscribe()
    );

    this.subscriptions.add(this.orderState$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  async counter(start: number, end: number, durationMs: number) {
    var delayTime: number = durationMs / (end - start);

    while (start < end) {
      start = start + 1;
      this.currentCents = start;
      await this.delay(delayTime);
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public loadModifierList(modifierListData: ModifierListData): void {
    this.itemStore.setSelectedModList(modifierListData);
  }

  public addToOrder(): void {
    var selectedModifiers;
    if (this.modListDetailsComponent)
      selectedModifiers = this.modListDetailsComponent.getSelectedModifiers();

    var variationData: VariationData = this.item.variationData;
    if (variationData.name == "Regular")
      variationData.name = this.item.itemData.name;

    var orderItem = this.orderService.newOrderItem(
      variationData,
      selectedModifiers
    );
    this.orderService.addToOrder(orderItem);

    this.userResponseDialog.open(UserResponseDialog, {
      hasBackdrop: true,
    });
  }
}

@Component({
  selector: "user-response-dialog",
  templateUrl: "user-response-dialog.html",
  styleUrls: ["user-response-dialog.css"],
})
export class UserResponseDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserResponseDialog>,
    private router: Router
  ) {}

  ngOnInit() {
    window.navigator.vibrate(200);
    setTimeout(() => this.dialogRef.close(), 1000);
  }

  close(): void {
    this.dialogRef.close();
  }

  viewOrder(): void {
    this.router.navigate(["user/cart"]);
    this.close();
  }
}
