import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { verificationGuard } from '../guards/verification.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [verificationGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [verificationGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
