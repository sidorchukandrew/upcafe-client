import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from "../../services/authorization.service";
import {
  tap,
  concatMap,
  filter,
  concat,
  switchMap,
  retry,
} from "rxjs/operators";
import { User } from "src/app/models/User";
import { noop } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material";
import { NoAccountDialogComponent } from "../no-account-dialog/no-account-dialog.component";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit, OnDestroy {
  private user: User;
  private socialUser: SocialUser;
  private dialogRef: MatDialogRef<NoAccountDialogComponent>;

  private oldBackground: string = document.body.style.backgroundColor;

  constructor(
    private thirdPartyAuthService: AuthService,
    private customAuthService: AuthorizationService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {

    document.body.style.background = "#080808";
    this.thirdPartyAuthService.authState
      .pipe(
        filter((socialUser) => socialUser != null),
        tap((socialUser) => (this.socialUser = socialUser)),
        tap((socialUser) => console.log(socialUser)),
        switchMap((socialUser) =>
          this.customAuthService.attemptSignIn(socialUser)
        ),
        tap((user) => {
          user ? (this.user = user) : noop;
        }),
        filter((user) => user == null),
        tap(() => this.showNoAccountYetDialog(this.socialUser))
      )
      .subscribe();
  }

  ngOnDestroy() {
    document.body.style.background = this.oldBackground;
  }

  showNoAccountYetDialog(user: SocialUser): void {
    this.dialogRef = this.matDialog.open(NoAccountDialogComponent, {
      data: this.socialUser,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        filter((socialUser) => socialUser != null),
        concatMap((socialUser) => this.customAuthService.createUser(socialUser))
      )
      .subscribe((createdUser) => (this.user = createdUser));
  }

  signInWithGoogle(): void {
    this.thirdPartyAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.thirdPartyAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.thirdPartyAuthService.signOut();
  }
}
