import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-feedback-submission-dialog',
  templateUrl: './feedback-submission-dialog.component.html',
  styleUrls: ['./feedback-submission-dialog.component.css']
})
export class FeedbackSubmissionDialog implements OnInit {

  public displayMessage: string;

  constructor(public dialogRef: MatDialogRef<FeedbackSubmissionDialog>,
    @Inject(MAT_DIALOG_DATA) public message: any) { }

  ngOnInit() {
    if(this.message == "success"){
      this.displayMessage = "Thanks for your feedback!";
      setTimeout(() => this.dialogRef.close(), 1000);
    }
    console.log(this.message);
  }

}
