import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  verse: string;
  imgUrl: string;
  passage: string;
  todayNumber: number;
  userSelectedDate: number;
  color: string;
  colors: Array<string>;

  incompleteOrders: Array<Order>;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {

    this.colors = new Array<string>();
    this.colors.push('red-gradient', 'blue-gradient', 'orange-gradient');

    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.todayNumber = this.daysIntoYear(new Date());
    this.userSelectedDate = this.todayNumber;
    this.fetchVerseByDate(this.todayNumber);
    this.incompleteOrders = new Array<Order>();

    this.orderService.getIncompleteCustomersOrders().subscribe(orders => {
      this.incompleteOrders = orders;
      console.log(this.incompleteOrders);
    })

  }

  clicked() {
    console.log("CLICKED!");
  }

  daysIntoYear(date): number {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
  }

  incrementDay(): void {
    this.userSelectedDate++;
  }

  decrementDay(): void {
    this.userSelectedDate--;
  }

  fetchVerseByDate(date): void {

    fetch('https://developers.youversionapi.com/1.0/verse_of_the_day/' + date + '?version_id=206', {
      headers: {
        'X-YouVersion-Developer-Token': 'lhGSP91Ig3J_1kLTC6FEm5I6HtE',
        'Accept-Language': 'en',
        Accept: 'application/json',
      }
    })
      .then((result) => result.json())
      .then((json) => {
        var verseObject = json['verse'];
        this.verse = json.verse.text;
        this.imgUrl = json.image.url;
        this.passage = json.verse.human_reference;
      });
  }

  resetDay() {
    this.userSelectedDate = this.todayNumber;
    this.fetchVerseByDate(this.userSelectedDate);
  }

}
