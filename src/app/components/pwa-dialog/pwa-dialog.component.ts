import { Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pwa-dialog',
  templateUrl: './pwa-dialog.component.html',
  styleUrls: ['./pwa-dialog.component.css']
})
export class PwaDialog implements OnInit {

  public isAndroid: boolean = false;
  public isIOS: boolean = false;

  constructor(private platform: Platform, private dialogRef: MatDialogRef<PwaDialog>) { }

  ngOnInit() {

    this.isAndroid = this.platform.ANDROID;
    this.isIOS = this.platform.IOS;
    this.isIOS = true;
  }

  public done(): void {
    this.dialogRef.close();
  }

}
