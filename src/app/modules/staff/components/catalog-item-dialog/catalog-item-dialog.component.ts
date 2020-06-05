import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-catalog-item-dialog',
  templateUrl: './catalog-item-dialog.component.html',
  styleUrls: ['./catalog-item-dialog.component.css']
})
export class CatalogItemDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<CatalogItemDialog>,@Inject(MAT_DIALOG_DATA) public item: MenuItem) { }

  ngOnInit() {
  }

}
