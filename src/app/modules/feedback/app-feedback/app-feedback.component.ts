import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-app-feedback",
  templateUrl: "./app-feedback.component.html",
  styleUrls: ["./app-feedback.component.css"],
})
export class AppFeedbackComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {
    console.log(this.location);
  }
}
