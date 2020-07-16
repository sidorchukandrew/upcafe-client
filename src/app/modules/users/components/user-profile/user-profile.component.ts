import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ConfirmDeleteOwnAccountDialog } from 'src/app/modules/confirm-delete-own-account-dialog/components/confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  public delete(): void {
    this.matDialog.open(ConfirmDeleteOwnAccountDialog, {
      autoFocus: false
    });

  }

}
