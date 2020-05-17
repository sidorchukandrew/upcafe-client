import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
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
import { Router } from '@angular/router';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit, OnDestroy {
  private user: User;
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
}
