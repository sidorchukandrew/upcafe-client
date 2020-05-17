import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { ThemeService } from "../services/theme.service";
import { Subscription, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoadingService } from "../services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = "UPCafé";
  private subscriptions: Subscription;

  darkThemeOn: boolean;
  darkThemeOn$: Observable<boolean>;

  loading$: Observable<boolean>;
  loading: boolean;

  constructor(
    private authService: AuthenticationService,
    private themeService: ThemeService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.darkThemeOn$ = this.themeService.darkThemeOn$;
    this.loading$ = this.loadingService.loading$;

    this.subscriptions.add(
      this.darkThemeOn$.pipe(tap((on) => this.changeStyles(on))).subscribe()
    );

    this.subscriptions.add(
      this.loading$.pipe(tap((loading) => (this.loading = loading))).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  changeStyles(darkThemeOn: boolean) {
    this.darkThemeOn = darkThemeOn;

    darkThemeOn
      ? (document.body.style.backgroundColor = "#080808")
      : (document.body.style.backgroundColor = "#f6f6f6");
  }
}
