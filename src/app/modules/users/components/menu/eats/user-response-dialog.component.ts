import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: "./user-response-dialog",
  templateUrl: "./user-response-dialog.html",
  styleUrls: ["./user-response-dialog.css"],
})
export class UserResponseDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<UserResponseDialog>, private router: Router) { }
  ngOnInit() {
    window.navigator.vibrate(200);
    setTimeout(() => this.dialogRef.close(), 1000);
  }

  close(): void {
    this.dialogRef.close();
  }

  viewOrder(): void {
    this.router.navigate(["user/cart"]);
    this.close();
  }
}
