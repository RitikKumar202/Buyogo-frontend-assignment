
# User Authentication Web Application

## Overview
This Angular web application provides a user authentication system, allowing users to sign in or log in based on their email address or phone number. The application features a multi-step signup process with data validation and persistence across steps, as well as a login flow with mock data validation.

## Features

- **User Validation:** Determines if a user exists based on their email/phone and displays the appropriate login or signup screen.

- **Login:** Users can log in with their email/phone and password. The application validates the credentials and displays a success or failure message.

- **Signup:** A multi-step signup process where users enter their details, with inline validation for fields like organization ID, pincode, and email/phone.

- **Data Persistence:** Form data persists when navigating between steps in the signup process.
## Setup Instructions

### Prerequisites
- Node.js: Ensure you have Node.js installed.
- Angular CLI: Install Angular CLI globally.
```bash
  npm install -g @angular/cli
```

### Installation

1. Clone the Repository:

```bash
  git clone https://github.com/RitikKumar202/buyogo-frontend-assignment.git
  cd buyogo-frontend-assignment
```

2. Install Dependencies:
```bash
  npm install
```
3. Run the Application:
```bash
  ng serve
```
Open http://localhost:4200/ in your web browser to access the application.
