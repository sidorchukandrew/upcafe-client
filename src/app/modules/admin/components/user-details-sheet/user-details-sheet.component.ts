import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserAdminView } from 'src/app/models/UserAdminView';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER, AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { tap } from 'rxjs/operators';
import { ConfirmDeleteOwnAccountDialog } from '../confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.component';

@Component({
  selector: 'app-user-details-sheet',
  templateUrl: './user-details-sheet.component.html',
  styleUrls: ['./user-details-sheet.component.css']
})
export class UserDetailsSheet implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  public darkThemeOn: boolean = false;

  public isAdmin: boolean = false;
  public isCustomer: boolean = true;
  public isStaff: boolean = false;

  public changesMade: boolean = false;
  public saving: boolean = false;
  public isMe: boolean = false;

  public deleting: boolean = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public user: UserAdminView,
              private bottomSheet: MatBottomSheetRef,
              private themeService: ThemeService,
              private userService: UsersService,
              private changeDetector: ChangeDetectorRef,
              private authenticationService: AuthenticationService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.subscriptions.add(this.authenticationService.authenticatedUser$.subscribe(user =>
      this.isMe = this.user.email == user.email));

    this.user.roles.forEach(role => {
      if(role.authority == ROLE_ADMIN) this.isAdmin = true;
      else if(role.authority == ROLE_STAFF) this.isStaff = true;
      else if(role.authority = ROLE_CUSTOMER) this.isCustomer = true;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.bottomSheet.dismiss(this.user);
  }

  public close(): void {
    this.bottomSheet.dismiss();
  }

  public toggleAdmin(): void {
    this.isAdmin = !this.isAdmin;

    if(this.isAdmin) {
      this.isStaff = true;
      this.isCustomer = true;
    }

    this.changesMade = true;
    this.changeDetector.detectChanges();
  }

  public toggleStaff(): void {
    this.isStaff = !this.isStaff;

    if(this.isStaff) {
      this.isAdmin = false;
      this.isCustomer = true;
    } else {
      this.isAdmin = false;
    }

    this.changesMade = true;
    this.changeDetector.detectChanges();
  }

  public onlyCustomer(): void {
    this.isStaff = false;
    this.isAdmin = false;

    this.changesMade = true;
    this.changeDetector.detectChanges();
  }

  public saveChanges(): void {
    this.saving = true;
    let roles: Array<any> = new Array();

    if(this.isCustomer) {
      roles.push({id: 1, authority: "ROLE_CUSTOMER"});
    }
    if(this.isStaff) {
      roles.push({id: 2, authority: "ROLE_STAFF"});
    }
    if(this.isAdmin) {
      roles.push({id: 3, authority: "ROLE_ADMIN"});
    }

    let updatedUser: UserAdminView = {
      accountCreatedOn: this.user.accountCreatedOn,
      email: this.user.email,
      id: this.user.id,
      imageUrl: this.user.imageUrl,
      name: this.user.name,
      provider: this.user.provider,
      roles: roles
    }

    this.userService.updateUser(updatedUser)
    .pipe(
      tap(() => {
       this.changesMade = false;
       this.saving = false;
       this.changeDetector.detectChanges();
      })
    ).subscribe(
      user => this.user = user,
      error => console.log(error)
    );
  }

  public delete(): void {
    if(this.isMe) {
      const dialogRef: MatDialogRef<ConfirmDeleteOwnAccountDialog> = this.matDialog.open(ConfirmDeleteOwnAccountDialog, {
        autoFocus: false, data: this.user
      });

      dialogRef.afterClosed().subscribe(deleteSuccessful => {
        this.bottomSheet.dismiss();
      });
    }

    else {
      this.deleting = true;
      this.userService.deleteUser(this.user).subscribe(deleteSuccessful => {
        this.user.id = -1;
        this.bottomSheet.dismiss();
      });
    }
  }

}
