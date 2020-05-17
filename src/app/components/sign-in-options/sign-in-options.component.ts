import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sign-in-options',
  templateUrl: './sign-in-options.component.html',
  styleUrls: ['./sign-in-options.component.css']
})
export class SignInOptionsComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
