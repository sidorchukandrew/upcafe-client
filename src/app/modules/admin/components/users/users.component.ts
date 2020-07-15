import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserDetailsSheet } from 'src/app/modules/admin/components/user-details-sheet/user-details-sheet.component';
import { UserAdminView } from 'src/app/models/UserAdminView';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private users: Array<UserAdminView>
  public darkThemeOn: boolean = false;

  public usersToDisplay: Array<UserAdminView>;

  private subscriptions: Subscription;
  constructor(private usersService: UsersService, private bottomSheet: MatBottomSheet, private themeService: ThemeService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users =>{
      this.users = users;
      this.usersToDisplay = this.copyArray(users);
      console.log(this.usersToDisplay);
    });
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private copyArray(users: Array<UserAdminView>): Array<UserAdminView> {
    return Array.from(users);
  }

  public showUser(user: UserAdminView): void {
    let panelClass: string = "";

    this.darkThemeOn ? panelClass = "dark-sheet-background" : panelClass = "light-sheet-background";

    let bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(UserDetailsSheet, {
      data: user,
      panelClass: panelClass
    });

    bottomSheetRef.afterDismissed().subscribe(updatedUser => {
      if(updatedUser.id >= 1) {
        let indexOfUserToUpdate: number = this.users.findIndex(user => user.id == updatedUser.id);
        this.users[indexOfUserToUpdate] = updatedUser;
        this.usersToDisplay = this.copyArray(this.users);
      } else {
        let indexOfUserToDelete: number = this.users.findIndex(userInArray => user.email == userInArray.email);
        this.users.splice(indexOfUserToDelete, 1);
        this.usersToDisplay = this.copyArray(this.users);
      }
    });
  }

  public filter(query: string) {
    this.usersToDisplay = this.copyArray(this.users);
    this.usersToDisplay = this.usersToDisplay.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
      || user.email.toLowerCase().includes(query.toLowerCase()));
  }

}
