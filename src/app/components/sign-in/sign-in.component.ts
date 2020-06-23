import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from "../../../environments/environment";
import { tap } from 'rxjs/operators';
import { WrongProviderDialog } from '../wrong-provider-dialog/wrong-provider-dialog.component';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<WrongProviderDialog>;

  private oldBackground: string = document.body.style.backgroundColor;

  constructor(
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
        document.body.style.background = "#080808";
  }

  ngOnInit(): void {

     this.activeRoute.queryParamMap.subscribe((paramMap) => {
       if (paramMap.has("error")) {
         this.showWrongProviderDialog(paramMap.get("error"));
       } else {
         if (paramMap.has("token")) {
           this.authenticationService.setAccessToken(paramMap.get("token"));
           this.authenticationService
             .getUserFromApi()
             .pipe(
               tap((user) => this.authenticationService.setSignedInUser(user))
             )
             .subscribe(() => this.router.navigateByUrl("roles"));
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
        data: {error: error}
      });
  }
}
