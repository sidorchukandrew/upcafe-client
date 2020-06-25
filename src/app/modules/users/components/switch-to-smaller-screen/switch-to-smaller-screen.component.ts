import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switch-to-smaller-screen',
  templateUrl: './switch-to-smaller-screen.component.html',
  styleUrls: ['./switch-to-smaller-screen.component.css']
})
export class SwitchToSmallerScreenComponent implements OnInit, OnDestroy {

  private isSmallerThanDesktop: boolean = false;
  private subscriptions: Subscription;

  constructor(private platformService: PlatformService, private router: Router) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.platformService.isDesktop$.subscribe(isDesktop => {
      if(!isDesktop) {
        this.router.navigate(['user/menu']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
