import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: "app-no-account-dialog",
  templateUrl: "./no-account-dialog.component.html",
  styleUrls: ["./no-account-dialog.component.css"],
})
export class NoAccountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NoAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: SocialUser
  ) {}


  close(user: SocialUser) {
    this.dialogRef.close(user);
  }
}
