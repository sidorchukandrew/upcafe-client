import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeatureRequest } from 'src/app/models/FeatureRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-feature-request",
  templateUrl: "./feature-request.component.html",
  styleUrls: ["./feature-request.component.css"],
})
export class FeatureRequestComponent implements OnInit, OnDestroy {

  public featuresForm: FormGroup = this.fb.group({
      page: [""],
      description: [""]
  });

  private user: User;
  private subscriptions: Subscription;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService,
    private authenticationService: AuthenticationService, private loadingService: LoadingService) {}

  ngOnInit() {

   this.subscriptions = new Subscription();
   this.subscriptions.add(this.authenticationService.authenticatedUser$.subscribe(user => this.user = user));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public submit(): void {
    var submitFeature$ = this.feedbackService.submitFeatureRequest({
      dateReported: new Date(),
      description: this.featuresForm.value.description,
      page: this.featuresForm.value.page,
      reporter: this.user
    }).pipe(
      tap(() => this.featuresForm.reset())
    );

    this.subscriptions.add(this.loadingService.showLoadingUntilComplete(submitFeature$).subscribe());
  }
}
