import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { UserAdminView } from 'src/app/models/UserAdminView';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER } from 'src/app/services/authentication.service';

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

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public user: UserAdminView, private bottomSheet: MatBottomSheetRef,
            private themeService: ThemeService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));

    this.user.roles.forEach(role => {
      console.log(role);
      if(role.authority == ROLE_ADMIN) this.isAdmin = true;
      else if(role.authority == ROLE_STAFF) this.isStaff = true;
      else if(role.authority = ROLE_CUSTOMER) this.isCustomer = true;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public close(): void {
    this.bottomSheet.dismiss();
  }

  public toggleAdmin(): void {
    this.isAdmin = !this.isAdmin;
  }

  public toggleStaff(): void {
    this.isStaff = !this.isStaff;
  }

  public toggleCustomer(): void {
    this.isCustomer = !this.isCustomer;
  }

}
