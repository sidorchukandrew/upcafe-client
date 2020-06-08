import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getIndexOfSpace } from 'src/app/utils/StringUtils';
import { VerseService } from 'src/app/services/verse.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  protected user: User;
  protected verseImageUrl: string = "";

  protected verses: Array<string>;
  constructor(private authenticationService: AuthenticationService, private verseService: VerseService) {
  }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.authenticationService.authenticatedUser$.subscribe(
      user => this.user = user
    ));

    this.verseService.verses$.subscribe(verses => this.verses = verses);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected getFirstName(name: string): string {
    return name.substring(0, getIndexOfSpace(this.user.name));
  }
}
