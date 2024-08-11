import {Routes} from '@angular/router';
import {CreateAccountComponent} from './create-account/create-account.component';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
