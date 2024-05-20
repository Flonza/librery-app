import { Routes } from '@angular/router';


export  const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import("../pages/home-page/home-page.component")
  },
  // {
  //   path: 'about-us',
  //   component: RegisterPageComponent,
  //   canActivate: [verificationGuard]
  // },
  // {
  //   path: 'login',
  //   component: LoginPageComponent,
  //   canActivate: [verificationGuard]
  // },
  {
    path: 'home',
    loadComponent: ()=> import("../pages/home-page/home-page.component")
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
