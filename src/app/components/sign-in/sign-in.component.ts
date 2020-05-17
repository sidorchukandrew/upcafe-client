import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { NoAccountDialogComponent } from "../no-account-dialog/no-account-dialog.component";
import { Router } from '@angular/router';

import { environment } from "../../../environments/environment";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<NoAccountDialogComponent>;

  private oldBackground: string = document.body.style.backgroundColor;

  constructor(
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.style.background = "#080808";
  }

  ngOnDestroy() {
    console.log("destroying");
    document.body.style.background = this.oldBackground;
  }

  public signInWithGoogle(): void {
    window.location.href = environment.backendUrl + "/oauth2/authorization/google?redirect_uri=http://localhost:4200/options";
  }
}
