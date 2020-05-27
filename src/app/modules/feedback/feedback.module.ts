import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugReportComponent } from './app-feedback/bug-report/bug-report.component';
import { FeatureRequestComponent } from './app-feedback/feature-request/feature-request.component';
import { AppFeedbackComponent } from './app-feedback/app-feedback.component';
import { FeedbackSubmissionDialog } from './app-feedback/feedback-submission-dialog/feedback-submission-dialog.component';
import { MatDialogModule, MatIconModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BugReportComponent,
    FeatureRequestComponent,
    AppFeedbackComponent,
    FeedbackSubmissionDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    MatButtonModule
  ],
  entryComponents: [
    FeedbackSubmissionDialog
  ],
  exports: [
    BugReportComponent,
    FeatureRequestComponent,
    AppFeedbackComponent,
    FeedbackSubmissionDialog
  ]
})
export class FeedbackModule { }
