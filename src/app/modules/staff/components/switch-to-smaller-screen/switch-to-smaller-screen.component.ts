import { Component, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-switch-to-smaller-screen',
  templateUrl: './switch-to-smaller-screen.component.html',
  styleUrls: ['./switch-to-smaller-screen.component.css']
})
export class SwitchToSmallerScreenComponent implements OnInit {

  private subscriptions: Subscription;

  constructor(private platformService: PlatformService, private router: Router) { }
  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.platformService.isDesktop$.subscribe(isDesktop => {
      if (!isDesktop) {
        this.router.navigate(['staff/orders']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
