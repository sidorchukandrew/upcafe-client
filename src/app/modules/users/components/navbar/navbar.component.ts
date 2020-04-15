import { Component, OnInit } from '@angular/core';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  badgeNumber$: Observable<number> = this.badgeService.newItemCount$;
  badgeNumber: number;
  subscriptions: Subscription;

  constructor(private badgeService: CartBadgeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.badgeNumber$
      .pipe(
        tap(badgeNumber => this.badgeNumber = badgeNumber),
      ).subscribe())
  }

}
