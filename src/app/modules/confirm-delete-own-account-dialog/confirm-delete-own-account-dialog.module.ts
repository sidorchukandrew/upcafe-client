import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteOwnAccountDialog } from './components/confirm-delete-own-account-dialog/confirm-delete-own-account-dialog.component';
import { MatProgressSpinnerModule, MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [ConfirmDeleteOwnAccountDialog],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [
    ConfirmDeleteOwnAccountDialog
  ]
})
export class ConfirmDeleteOwnAccountDialogModule { }
