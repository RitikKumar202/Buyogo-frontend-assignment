import {Routes} from '@angular/router';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {LoginComponent} from './components/login/login.component';
import {WelcomeComponent} from './components/welcome/welcome.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
