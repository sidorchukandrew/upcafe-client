import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { UserAdminView } from 'src/app/models/UserAdminView';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

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

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public user: UserAdminView,
              private bottomSheet: MatBottomSheetRef,
              private themeService: ThemeService,
              private userService: UsersService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.user.roles.forEach(role => {
      if(role.authority == ROLE_ADMIN) this.isAdmin = true;
      else if(role.authority == ROLE_STAFF) this.isStaff = true;
      else if(role.authority = ROLE_CUSTOMER) this.isCustomer = true;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.bottomSheet.dismiss(this.user);
    console.log("destroying");
  }

  public close(): void {
    this.bottomSheet.dismiss();
  }

  public toggleAdmin(): void {
    this.isAdmin = !this.isAdmin;
    this.changesMade = true;
  }

  public toggleStaff(): void {
    this.isStaff = !this.isStaff;
    this.changesMade = true;
  }

  public toggleCustomer(): void {
    this.isCustomer = !this.isCustomer;
    this.changesMade = true;
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

    this.userService.updateUser(updatedUser).subscribe(user => {
      this.changesMade = false;
      this.saving = false;
      this.user = user;
    });
  }

}
