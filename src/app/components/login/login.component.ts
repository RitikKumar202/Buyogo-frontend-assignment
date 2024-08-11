import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Defines the initial state of the user object with email/phone and password
  // fields
  user = {emailOrPhone: '', password: ''};
  // Variable to store the user's name fetched from the AuthService
  userName = '';
  // Flags to handle success and error states
  isPasswordIncorrect = false;
  isSuccess = false;

  // Injects AuthService and ActivatedRoute to use within the component
  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  // Lifecycle hook that initializes the component
  ngOnInit() {
    // Subscribes to query parameters from the route
    this.route.queryParams.subscribe((params) => {
      // Sets the email or phone number from the query parameter
      this.user.emailOrPhone = params['emailOrPhone'];
      // Fetches user details based on the email or phone number
      const userDetails =
          this.authService.getUserDetails(this.user.emailOrPhone);
      // If user details are found, sets the user's name
      if (userDetails) {
        this.userName = userDetails.name;
      }
    });
  }

  // Method called when the form is submitted
  onSubmit() {
    // Retrieves user details based on the entered email or phone number
    const userDetails = this.authService.getUserDetails(this.user.emailOrPhone);

    // Checks if the user details exist and if the entered password matches the
    // stored password
    if (userDetails && this.user.password === userDetails.password) {
      // Sets success flag to true if the password is correct
      this.isSuccess = true;
    } else {
      // Sets error flag to true if the password is incorrect
      this.isPasswordIncorrect = true;
    }
  }
}
