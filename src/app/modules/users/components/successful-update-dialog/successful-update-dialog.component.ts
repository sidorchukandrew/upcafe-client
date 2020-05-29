import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-successful-update-dialog',
  templateUrl: './successful-update-dialog.component.html',
  styleUrls: ['./successful-update-dialog.component.css']
})
export class SuccessfulUpdateDialog implements OnInit {

  constructor(private matDialog: MatDialogRef<SuccessfulUpdateDialog>) { }

  ngOnInit() {
    setTimeout(() => this.matDialog.close(), 1000);
  }

}
