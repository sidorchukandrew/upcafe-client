import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-feature-request",
  templateUrl: "./feature-request.component.html",
  styleUrls: ["./feature-request.component.css"],
})
export class FeatureRequestComponent implements OnInit {
  featuresForm: FormGroup = this.fb.group({
    reportInfo: this.fb.group({
      reporterName: [
        localStorage.getItem("firstName") +
          " " +
          localStorage.getItem("lastName"),
      ],
      reporterEmail: [localStorage.getItem("email")],
      reportedDateTime: [new Date()],
      platform: ["IOS"],
      browser: ["Firefox"],
    }),
    featureInfo: this.fb.group({
      page: [""],
      description: [""],
    }),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit() {
    console.log(this.featuresForm.value);
  }
}
