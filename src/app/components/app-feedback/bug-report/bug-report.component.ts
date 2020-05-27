import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: "app-bug-report",
  templateUrl: "./bug-report.component.html",
  styleUrls: ["./bug-report.component.css"],
})
export class BugReportComponent implements OnInit, OnDestroy {

  private user: User;
  private subscriptions: Subscription;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
    private feedbackService: FeedbackService) {}

  bugForm: FormGroup = this.fb.group({
      expected: [""],
      actual: [""],
      page: [""],
      extra: [""]
  });

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.authenticationService.authenticatedUser$.subscribe(user => this.user = user));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  submit() {
    this.feedbackService.submitBug({
      reporter: this.user,
      dateReported: new Date(),
      actual: this.bugForm.value.actual,
      expectation: this.bugForm.value.expected,
      page: this.bugForm.value.page,
      extraInformation: this.bugForm.value.extra,
      browser: "Mozilla",
      platform: "iOS"
    }).subscribe();
  }
}
