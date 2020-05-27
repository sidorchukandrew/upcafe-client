import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Platform } from '@angular/cdk/platform';
import { MatButton } from '@angular/material';

@Component({
  selector: "app-bug-report",
  templateUrl: "./bug-report.component.html",
  styleUrls: ["./bug-report.component.css"],
})
export class BugReportComponent implements OnInit, OnDestroy {

  private user: User;
  private subscriptions: Subscription;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
    private feedbackService: FeedbackService, private platform: Platform) {}

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

    var platform: string = "Unknown", browser: string = "Unknown";

    if(this.platform.FIREFOX) browser = "Firefox";
    else if(this.platform.SAFARI) browser = "Safari";
    else if(this.platform.EDGE) browser = "Edge";

    if(this.platform.ANDROID) platform = "Android";
    else if(this.platform.IOS) platform = "IOS";

    console.log(window.navigator.userAgent);

    this.feedbackService.submitBug({
      reporter: this.user,
      dateReported: new Date(),
      actual: this.bugForm.value.actual,
      expectation: this.bugForm.value.expected,
      page: this.bugForm.value.page,
      extraInformation: this.bugForm.value.extra,
      browser: browser,
      platform: platform
    }).subscribe(() => this.bugForm.reset());
  }
}
