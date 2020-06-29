import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoursService } from 'src/app/services/hours.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-begin-order',
  templateUrl: './begin-order.component.html',
  styleUrls: ['./begin-order.component.css']
})
export class BeginOrderComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  public buttonMessage: string = "Cafe is Closed";
  public cafeClosed: boolean = true;

  constructor(private hoursService: HoursService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.hoursService.getAvailablePickupTimes().subscribe(times => {
      if(times == null || times.length <= 0) {
        this.buttonMessage = "Cafe is Closed";
        this.cafeClosed = true;
      }
      else {
        this.buttonMessage = "Start Your Order";
        this.cafeClosed = false;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
