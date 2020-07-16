import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteOwnAccountDialog } from 'src/app/modules/confirm-delete-own-account-dialog/components/confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.component';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  public delete(): void {
    this.matDialog.open(ConfirmDeleteOwnAccountDialog, {
      autoFocus: false
    });

  }

}
