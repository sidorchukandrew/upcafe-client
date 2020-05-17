import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-wrong-provider-dialog",
  templateUrl: "./wrong-provider-dialog.component.html",
  styleUrls: ["./wrong-provider-dialog.component.css"],
})
export class WrongProviderDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WrongProviderDialog>,
    @Inject(MAT_DIALOG_DATA) public message: any) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
