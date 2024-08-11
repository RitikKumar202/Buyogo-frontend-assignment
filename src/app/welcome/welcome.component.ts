import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  // Regular expression patterns for email and mobile number validation
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  mobilePattern = /^[0-9]{10}$/;

  constructor(private authService: AuthService, private router: Router) {}

  // Method to handle the "Next" button click event
  onNextClick() {
    // Get the values of the email and mobile input fields
    const emailInput =
        (document.getElementById('email') as HTMLInputElement).value;
    const mobileInput =
        (document.getElementById('mobile') as HTMLInputElement).value;

    // Validate the email input
    if (emailInput && !this.emailPattern.test(emailInput)) {
      alert('Please enter a valid email address.');
      return;  // Exit the method if the email is invalid
    }

    // Validate the mobile input
    if (mobileInput && !this.mobilePattern.test(mobileInput)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;  // Exit the method if the mobile number is invalid
    }

    // Determine if we have either an email or mobile number input
    const emailOrPhone = emailInput || mobileInput;
    if (emailOrPhone) {
      // Call the AuthService method to navigate based on registration status
      this.authService.navigateBasedOnRegistrationStatus(emailOrPhone);
    } else {
      alert('Please enter an email or mobile number.');
    }
  }
}
