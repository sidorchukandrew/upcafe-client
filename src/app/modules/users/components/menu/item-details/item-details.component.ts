import { Component, OnInit, Input } from '@angular/core';
import { CategoryItem } from 'src/app/models/CategoryItem';
import { MenuService } from 'src/app/services/menu.service';
import { LineItem } from 'src/app/models/LineItem';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: LineItem;
  totalItemPrice: number;
  priceDollars: number;
  priceCents: number;
  currentCents: number;

  constructor(private menuService: MenuService) {
    this.item = menuService.getCurrentLineItem();

    this.totalItemPrice = this.item.variationData.variationPrice;
    this.priceCents = 99;


    //TODO: GET BY ID IF NOT LOADED IN
    // console.log(this.priceDollars);
  }

  ngOnInit() {
  }

  parsePrice(price: number): void {
    var index: number = price.toString().indexOf('.');

    if (index != -1) {
      this.priceDollars = parseInt(price.toString().substr(0, index));
      // this.priceCents = parseInt(price.toString().substr(index + 1, price.toString().length));
    }
    else {
      this.priceDollars = price;
      // this.priceCents = '00';
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
}
