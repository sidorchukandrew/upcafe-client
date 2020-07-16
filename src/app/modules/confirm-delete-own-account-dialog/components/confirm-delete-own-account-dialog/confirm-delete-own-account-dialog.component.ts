import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';
import { UserAdminView } from 'src/app/models/UserAdminView';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-delete-own-account-dialog',
  templateUrl: './confirm-delete-own-account-dialog.component.html',
  styleUrls: ['./confirm-delete-own-account-dialog.component.css']
})
export class ConfirmDeleteOwnAccountDialog implements OnInit {

  public saving: boolean = false;
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteOwnAccountDialog>,
    private userService: UsersService,
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public me: UserAdminView) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public delete(): void {
    this.saving = true;
    this.userService.deleteMe().subscribe(deleteSuccessful => {
      if(deleteSuccessful) {
        this.authenticationService.signOut();
        this.dialogRef.close(true);
        this.router.navigateByUrl("");
      }
    });
  }

}
