import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,  // Indicates that this component is a standalone component
  imports:
      [CommonModule, ReactiveFormsModule],   // Import necessary Angular modules
  templateUrl: './step-one.component.html',  // Path to the component's template
  styleUrls: ['./step-one.component.css']  // Path to the component's stylesheet
})
export class StepOneComponent implements OnInit {
  @Input()
  emailOrPhone: string|null =
      null;  // Input property to receive email or phone from parent component
  @Input()
  formData:
      any = {};  // Input property to receive form data from parent component
  @Output()
  next = new EventEmitter<any>();  // Output property to emit event with form
                                   // data when 'Next' is clicked

  // Reactive form for step one with initial values and validators
  stepOneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize form group with form controls and their validators
    this.stepOneForm = this.fb.group({
      email: [
        '',  // Initial value of email field
        [
          Validators.required,  // Email is required
          Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)  // Email
                                                                    // validation
                                                                    // pattern
        ]
      ],
      fullName: [
        '', [Validators.required, Validators.minLength(3)]
      ],  // Full name is required and must be at least 3 characters long
      password: [
        '', [Validators.required, Validators.minLength(6)]
      ]  // Password is required and must be at least 6 characters long
    });
  }

  ngOnInit() {
    // Patch form values if emailOrPhone or formData is provided
    if (this.emailOrPhone) {
      this.stepOneForm.patchValue({email: this.emailOrPhone});
    }
    if (this.formData) {
      this.stepOneForm.patchValue(this.formData);
    }
  }

  // Method to handle 'Next' button click
  onNext() {
    if (this.stepOneForm.valid) {
      // Emit the form data to the parent component if the form is valid
      this.next.emit(this.stepOneForm.value);
    }
  }
}
