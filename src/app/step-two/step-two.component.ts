import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  // Input property to receive initial data from the parent component
  @Input() initialData: any;
  // Output property to emit event when the user clicks 'Next'
  @Output() next = new EventEmitter<any>();
  // Output property to emit event when the user clicks 'Previous'
  @Output() previous = new EventEmitter<void>();

  // Reactive form group for the second step
  stepTwoForm: FormGroup;
  // Array to hold allowed organization IDs
  allowedOrgIds: string[] = [];

  // Dependency injection of FormBuilder and AuthService
  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initializing the form group with controls and validators
    this.stepTwoForm = this.fb.group({
      orgName: ['', Validators.required],      // Organization name field
      orgId: ['', Validators.required],        // Organization ID field
      designation: ['', Validators.required],  // Designation field
      birthDate: ['', Validators.required],    // Birthdate field
      city: ['', Validators.required],         // City field
      pincode: [
        '', [Validators.required, Validators.pattern(/^\d{6}$/)]
      ]  // Pincode field with 6-digit validation
    });
  }

  // Lifecycle hook to initialize component and fetch necessary data
  ngOnInit() {
    // If initial data is provided, patch it to the form
    if (this.initialData) {
      this.stepTwoForm.patchValue(this.initialData);
    }

    // Fetch allowed organization IDs from AuthService
    this.authService.getAllowedOrgIds().subscribe((orgIds: string[]) => {
      this.allowedOrgIds = orgIds;
    });
  }

  // Method to handle 'Next' button click
  onNext() {
    // Validate if the organization ID is within the allowed list
    if (!this.allowedOrgIds.includes(this.stepTwoForm.get('orgId')?.value)) {
      // Set custom error if organization ID is not recognized
      this.stepTwoForm.get('orgId')?.setErrors({unknownOrgId: true});
      return;
    }

    // If form is valid, emit form data to the parent component
    if (this.stepTwoForm.valid) {
      this.next.emit(this.stepTwoForm.value);  // Pass form data to parent
    }
  }

  // Method to handle 'Previous' button click
  onPrevious() {
    // Emit event to go back to the previous step
    this.previous.emit();
  }

  // Method to validate pincode input to allow only digits
  validatePincodeInput(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();  // Prevent non-digit characters
    }
  }
}
