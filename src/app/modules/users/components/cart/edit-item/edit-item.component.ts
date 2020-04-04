import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModListDetailsComponent } from '../../menu/mod-list-details/mod-list-details.component';
import { LineItem } from 'src/app/models/LineItem';
import { CatalogService } from 'src/app/services/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ModifierListData } from 'src/app/models/ModifierListData';
import { SelectedItemService } from 'src/app/services/selected-item.service';
import { Subscription } from 'rxjs';
import { EditItemService } from 'src/app/services/edit-item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['../../menu/item-details/item-details.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {

  @ViewChild(ModListDetailsComponent, { static: false })
  private modListDetailsComponent: ModListDetailsComponent;

  item: LineItem;
  totalItemPrice: number;
  priceDollars: number;
  priceCents: any;
  currentCents: number;
  nameOfCurrentlySelectedModifierList: string;
  subscriptions: Subscription;

  constructor(private catalogService: CatalogService,
    private route: ActivatedRoute, private orderService: OrderService, private router: Router, private selectedItemService: SelectedItemService,
    private editService: EditItemService) {
    this.nameOfCurrentlySelectedModifierList = '';
    this.item = new LineItem();

  }

  ngOnInit() {
    this.catalogService.getVariation(this.route.snapshot.paramMap.get('id')).subscribe(lineItem => {
      this.item.itemData = lineItem['itemData'];
      this.item.variationData = lineItem['variationData'];
      this.item.modifierListsData = lineItem['modifierListsData'];
      this.totalItemPrice = this.item.variationData.variationPrice;
      this.parsePrice(this.totalItemPrice);
    });

    this.subscriptions = new Subscription();

    this.subscriptions.add(this.selectedItemService.getSelectedModifierListData().subscribe(data => {
      this.nameOfCurrentlySelectedModifierList = data.nameOfList;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.orderService.setItemBeingEdited(null);
  }

  parsePrice(price: number): void {
    var index: number = price.toString().indexOf('.');

    if (index != -1) {
      this.priceDollars = parseInt(price.toString().substr(0, index));
      this.priceCents = parseInt(price.toString().substr(index + 1, price.toString().length));
    }
    else {
      this.priceDollars = price;
      this.priceCents = '00';
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
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public loadModifierList(modifierListData: ModifierListData): void {
    this.selectedItemService.setSelectedModifierList(modifierListData);
  }

  public confirmEdit(): void {
    this.router.navigate(['user/cart']);
  }
}

