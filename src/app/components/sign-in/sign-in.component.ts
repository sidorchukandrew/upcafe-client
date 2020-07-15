import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { AuthenticationService, ROLE_CUSTOMER, ROLE_STAFF, ROLE_ADMIN } from "../../services/authentication.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from "../../../environments/environment";
import { tap } from 'rxjs/operators';
import { WrongProviderDialog } from '../wrong-provider-dialog/wrong-provider-dialog.component';
import { PwaDialog } from '../pwa-dialog/pwa-dialog.component';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<WrongProviderDialog>;
  private pwaDialogRef: MatDialogRef<PwaDialog>;

  private oldBackground: string = document.body.style.backgroundColor;
  public pwaInstalled: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    document.body.style.background = "#080808";
  }

  ngOnInit(): void {

    this.pwaInstalled = window.matchMedia('(display-mode: standalone)').matches;

    this.activeRoute.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has("error")) {
        this.showWrongProviderDialog(paramMap.get("error"));
      } else if (paramMap.has("token")) {
        this.authenticationService.setAccessToken(paramMap.get("token"));
        this.authenticationService
          .getUserFromApi()
          .pipe(
            tap((user) => this.authenticationService.setSignedInUser(user))
          )
          .subscribe(() => this.router.navigateByUrl("roles"));
      } else if (this.authenticationService.getAccessToken() != null && this.authenticationService.getAccessToken() != "") {
        if (this.authenticationService.getRoleSignedInWith() == ROLE_CUSTOMER) {
          this.router.navigateByUrl("user/menu");
        } else if (this.authenticationService.getRoleSignedInWith() == ROLE_STAFF) {
          this.router.navigateByUrl("staff/orders/new");
        } else if (this.authenticationService.getRoleSignedInWith() == ROLE_ADMIN) {
          this.router.navigateByUrl("admin/cafe");
        } else {
          this.router.navigateByUrl("roles")
        }
      }
    });
  }

  ngOnDestroy() {
    document.body.style.background = this.oldBackground;
  }

  public signInWithGoogle(): void {
    window.location.href = environment.backendUrl + "/oauth2/authorization/google?redirect_uri=https://upcafe.azurewebsites.net";
  }

  public signInWithFacebook(): void {
    window.location.href = environment.backendUrl + "/oauth2/authorization/facebook?redirect_uri=https://upcafe.azurewebsites.net";
  }

  private showWrongProviderDialog(error: string) {
    this.dialogRef = this.matDialog.open(WrongProviderDialog, {
      data: { error: error },
      autoFocus: false
    });
  }

  public showPwaInstallation(): void {
    this.pwaDialogRef = this.matDialog.open(PwaDialog, {
      panelClass: "pwa-installation",
      width: "95%",
      autoFocus: false
    });
  }
}
