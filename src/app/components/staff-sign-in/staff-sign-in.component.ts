import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-staff-sign-in',
  templateUrl: './staff-sign-in.component.html',
  styleUrls: ['./staff-sign-in.component.css']
})
export class StaffSignInComponent implements OnInit {

  private signInForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private authService: AuthorizationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.attemptStaffSignIn(this.signInForm.value['username'], this.signInForm.value['password']);
  }

}
