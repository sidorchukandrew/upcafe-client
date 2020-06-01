import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getIndexOfSpace } from 'src/app/utils/StringUtils';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  protected user: User;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.authenticationService.authenticatedUser$.subscribe(
      user => this.user = user
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected getFirstName(name: string): string {
    return name.substring(0, getIndexOfSpace(this.user.name));
  }
}
