import { Component, OnInit, Input } from '@angular/core';
import { LineItem } from 'src/app/models/LineItem';

@Component({
  selector: 'app-item',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css']
})
export class OrderItemDetailsComponent implements OnInit {

  @Input() item: LineItem;
  constructor() { }

  ngOnInit() {
  }

}
