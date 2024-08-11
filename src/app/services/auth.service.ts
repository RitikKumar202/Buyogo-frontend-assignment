import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Mock user data for demonstration purposes
  private users = [
    {
      name: 'John Doe',
      email: 'user1@example.com',
      phone: '9876543210',
      password: 'password1',
    },
    {
      name: 'Jane Smith',
      email: 'user2@example.com',
      phone: '9999999999',
      password: 'password2',
    },
  ];

  // Allowed organization IDs for validation
  private allowedOrgIds = ['ORG001', 'ORG002', 'ORG003'];

  // Temporary storage for email or phone number during navigation
  private tempEmailOrPhone: string|null = null;

  // Angular's Router service for navigation
  constructor(private router: Router) {}

  // Checks if a user is registered based on the provided email or phone number
  isUserRegistered(emailOrPhone: string): boolean {
    return this.users.some(
        (user) => user.email === emailOrPhone || user.phone === emailOrPhone);
  }

  // Retrieves user details based on the provided email or phone number
  getUserDetails(emailOrPhone: string) {
    return this.users.find(
        (user) => user.email === emailOrPhone || user.phone === emailOrPhone);
  }

  // Retrieves the email associated with the provided phone number
  getEmailByPhone(phone: string): string|undefined {
    const user = this.users.find((user) => user.phone === phone);
    return user ? user.email : undefined;
  }

  // Sets a temporary value for email or phone number
  setTempEmailOrPhone(value: string) {
    this.tempEmailOrPhone = value;
  }

  // Retrieves the temporary value for email or phone number
  getTempEmailOrPhone(): string|null {
    return this.tempEmailOrPhone;
  }

  // Navigates to the appropriate route based on user registration status
  navigateBasedOnRegistrationStatus(emailOrPhone: string): void {
    // Store the provided email or phone number temporarily
    this.setTempEmailOrPhone(emailOrPhone);

    // If the user is registered, navigate to the login page
    if (this.isUserRegistered(emailOrPhone)) {
      // Retrieve the email if the provided value is a phone number
      const email = this.getEmailByPhone(emailOrPhone) || emailOrPhone;
      // Navigate to the login page with the email or phone number as a query
      // parameter
      this.router.navigate(['/login'], {
        queryParams: {emailOrPhone: email},
      });
    } else {
      // If the user is not registered, navigate to the create account page
      this.router.navigate(['/create-account']);
    }
  }

  // Returns an observable of allowed organization IDs
  getAllowedOrgIds(): Observable<string[]> {
    return of(this.allowedOrgIds);
  }
}
