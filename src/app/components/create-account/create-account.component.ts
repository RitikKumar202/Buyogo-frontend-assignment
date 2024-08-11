import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {RegistrationSuccessComponent} from '../registration-success/registration-success.component';
import {StepOneComponent} from '../step-one/step-one.component';
import {StepTwoComponent} from '../step-two/step-two.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule, StepOneComponent, StepTwoComponent,
    RegistrationSuccessComponent
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  // Current step in the multi-step form
  currentStep = 1;

  // Variable to hold email or phone number from the auth service
  emailOrPhone: string|null;

  // Objects to store form data from each step
  stepOneData: any = {};  // Store step-one form data
  stepTwoData: any = {};  // Store step-two form data

  // Injecting AuthService to get temporary email or phone number
  constructor(private authService: AuthService) {
    // Initialize emailOrPhone with value from AuthService
    this.emailOrPhone = this.authService.getTempEmailOrPhone();
  }

  // Method to move to the next step in the form
  nextStep() {
    this.currentStep++;
  }

  // Method to move to the previous step in the form
  previousStep() {
    this.currentStep--;
  }

  // Method to handle data from StepOneComponent
  handleStepOneData(data: any) {
    this.stepOneData = data;
  }

  // Method to handle data from StepTwoComponent
  handleStepTwoData(data: any) {
    this.stepTwoData = data;
  }
}
