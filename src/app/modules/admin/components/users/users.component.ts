import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserDetailsSheet } from 'src/app/modules/admin/components/user-details-sheet/user-details-sheet.component';
import { UserAdminView } from 'src/app/models/UserAdminView';
import { MatBottomSheet } from '@angular/material';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  protected users: Array<UserAdminView>
  private darkThemeOn: boolean = false;

  private subscriptions: Subscription;
  constructor(private usersService: UsersService, private bottomSheet: MatBottomSheet, private themeService: ThemeService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => this.users = users);
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected showUser(user: UserAdminView): void {
    let panelClass: string = "";

    this.darkThemeOn ? panelClass = "dark-sheet-background" : panelClass = "light-sheet-background";

    this.bottomSheet.open(UserDetailsSheet, {
      data: user,
      panelClass: panelClass
    });
  }

}
