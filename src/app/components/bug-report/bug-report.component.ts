import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-bug-report",
  templateUrl: "./bug-report.component.html",
  styleUrls: ["./bug-report.component.css"],
})
export class BugReportComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  bugForm: FormGroup = this.fb.group({
    reportInfo: this.fb.group({
      reporterName: [
        localStorage.getItem("firstName") +
          " " +
          localStorage.getItem("lastName"),
      ],
      reporterEmail: [localStorage.getItem("email")],
      reportedDate: [new Date().toDateString()],
      reportedTime: [new Date().toLocaleTimeString()],
      platform: ["IOS"],
      browser: ["Firefox"],
    }),
    bugInfo: this.fb.group({
      description: [""],
    }),
  });
  ngOnInit() {}

  submit() {
    console.log(this.bugForm.value);
  }
}
