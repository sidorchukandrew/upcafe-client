import { TestBed } from "@angular/core/testing";
import { FeedbackService } from './feedback.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BugReport } from '../models/BugReport';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { FeatureRequest } from '../models/FeatureRequest';
import { HttpErrorResponse } from '@angular/common/http';

xdescribe('FeedbackService', () => {

  let feedbackService: FeedbackService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedbackService]
    });

    feedbackService = TestBed.get(FeedbackService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should submit a bug report', () => {

    const REPORTED_DATE: Date = new Date();

    const REPORTER: User = {email: "sidorchukandrew@gmail.com", id: 8, imageUrl: "https://www.google.com",
      name: "Andrew Sidorchuk", roles: ["ROLE_CUSTOMER", "ROLE_STAFF"]};

    const BUG: BugReport = {
      browser: "Mozilla", dateReported: REPORTED_DATE, platform: "iOS", reporter: REPORTER, page: "Payment",
      actual: "No error message showed up", expectation: "I didn't put in the credit card information and it should tell me to"
    };

    feedbackService.submitBug(BUG).subscribe(savedBug => {
      expect(savedBug).toBeTruthy("No bug was returned on save request");

      expect(savedBug.dateReported).toEqual(REPORTED_DATE);
      expect(savedBug.browser).toBe("Mozilla");
      expect(savedBug.actual).toBe("No error message showed up");
      expect(savedBug.expectation).toBe("I didn't put in the credit card information and it should tell me to");
      expect(savedBug.page).toBe("Payment");
      expect(savedBug.platform).toBe("iOS");

      expect(savedBug.reporter.email).toBe("sidorchukandrew@gmail.com");
      expect(savedBug.reporter.name).toBe("Andrew Sidorchuk");
      expect(savedBug.reporter.id).toBe(8);
      expect(savedBug.reporter.imageUrl).toBe("https://www.google.com");

    });

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/bugs");

    expect(testRequest.request.method).toBe("POST");

    testRequest.flush(BUG);
  });

  it("should submit a feature request", () => {
    const REPORTED_DATE: Date = new Date();

    const REPORTER: User = {
      email: "sidorchukandrew@gmail.com", id: 8, imageUrl: "https://www.google.com",
      name: "Andrew Sidorchuk", roles: ["ROLE_CUSTOMER", "ROLE_STAFF"]
    };

    const NEW_FEATURE: FeatureRequest = { dateReported: REPORTED_DATE, reporter: REPORTER, description: "Pay with Apple Pay" };

    feedbackService.submitFeatureRequest(NEW_FEATURE).subscribe(savedRequest => {
      expect(savedRequest).toBeTruthy("The save did not go through");

      expect(savedRequest.description).toBe("Pay with Apple Pay");
      expect(savedRequest.dateReported).toBe(REPORTED_DATE);

      expect(savedRequest.reporter.email).toBe("sidorchukandrew@gmail.com");
      expect(savedRequest.reporter.name).toBe("Andrew Sidorchuk");
      expect(savedRequest.reporter.id).toBe(8);
      expect(savedRequest.reporter.imageUrl).toBe("https://www.google.com");
    });

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/features");

    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(NEW_FEATURE);
  });

  it("should give an error when a feature submission fails", () => {
    const REPORTED_DATE: Date = new Date();

    const REPORTER: User = {
      email: "sidorchukandrew@gmail.com", id: 8, imageUrl: "https://www.google.com",
      name: "Andrew Sidorchuk", roles: ["ROLE_CUSTOMER", "ROLE_STAFF"]
    };

    const NEW_FEATURE: FeatureRequest = { dateReported: REPORTED_DATE, reporter: REPORTER, description: "Pay with Apple Pay" };

    feedbackService.submitFeatureRequest(NEW_FEATURE).subscribe(
      () => fail(),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe("Internal Server Error");
      }
    );

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/features");

    expect(testRequest.request.method).toBe("POST");
    expect(testRequest.request.body.description).toBe("Pay with Apple Pay");
  });

  it("should give an error if feature submission fails", () => {
    const REPORTED_DATE: Date = new Date();

    const REPORTER: User = {
      email: "sidorchukandrew@gmail.com", id: 8, imageUrl: "https://www.google.com",
      name: "Andrew Sidorchuk", roles: ["ROLE_CUSTOMER", "ROLE_STAFF"]
    };

    const NEW_FEATURE: FeatureRequest = { dateReported: REPORTED_DATE, reporter: REPORTER, description: "Pay with Apple Pay" };

    feedbackService.submitFeatureRequest(NEW_FEATURE).subscribe(
      () => fail(),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe("Internal Server Error");
      }
    );

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/features");

    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(NEW_FEATURE, {status: 500, statusText: "Internal Server Error"});
  });

  it("should give an error if bug submission fails", () => {
    const REPORTED_DATE: Date = new Date();

    const REPORTER: User = {
      email: "sidorchukandrew@gmail.com", id: 8, imageUrl: "https://www.google.com",
      name: "Andrew Sidorchuk", roles: ["ROLE_CUSTOMER", "ROLE_STAFF"]
    };

    const BUG: BugReport = {
      browser: "Mozilla", dateReported: REPORTED_DATE, platform: "iOS", reporter: REPORTER, page: "Payment",
      actual: "No error message showed up", expectation: "I didn't put in the credit card information and it should tell me to"
    };


    feedbackService.submitBug(BUG).subscribe(
      () => fail(),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe("Internal Server Error");
      }
    );

    const testRequest = httpTestingController.expectOne(environment.backendUrl + "/api/v1/bugs");

    expect(testRequest.request.method).toBe("POST");
    testRequest.flush(BUG, { status: 500, statusText: "Internal Server Error" });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
