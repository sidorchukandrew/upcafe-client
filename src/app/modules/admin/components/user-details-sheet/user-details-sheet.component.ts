import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { UserAdminView } from 'src/app/models/UserAdminView';

@Component({
  selector: 'app-user-details-sheet',
  templateUrl: './user-details-sheet.component.html',
  styleUrls: ['./user-details-sheet.component.css']
})
export class UserDetailsSheet implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public user: UserAdminView, private bottomSheet: MatBottomSheetRef) { }

  ngOnInit() {
    console.log(this.user);
  }

}
