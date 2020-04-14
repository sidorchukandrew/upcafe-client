import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imgUrl: string;
  name: string;
  email: string;

  constructor() { }

  ngOnInit() {
    this.imgUrl = "https://lh3.googleusercontent.com/a-/AOh14GhIz8ImV-cH4k5bKa2DDVJD-QPW238HRL6xL9ey=s96-c";
    this.name = "Andrew Sidorchuk";
    this.email = "sidorchukandrew@gmail.com";
  }

}
