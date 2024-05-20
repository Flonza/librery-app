import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { LayoutPageComponent } from './books/layout-page/layout-page.component';
import { Page404Component } from './shared/page-404/page-404.component';
import { authGuard } from './guards/auth.guard';
import { verificationGuard } from './guards/verification.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/pages/home-ly-page/home-ly-page.component').then(
        (c) => c.HomeLyPageComponent
      ),
    loadChildren: () =>
      import('./home/routes/home.routes').then((r) => r.routes),
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./users/pages/books-ly/books-ly.component').then(
        (c) => c.BooksLyComponent
      ),
    loadChildren: () =>
      import('./users/routes/users.routes').then(r => r.booksRoutes)
  },
  // {
  //   path: 'books',
  //   component: LayoutPageComponent,
  //   loadChildren: () =>
  //     import('./books/user-module.routes').then((r) => r.routes),
  //   canActivate: [authGuard],
  // },
  {
    path: 'auth',
    component: AuthPageComponent,
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'page-404',
    component: Page404Component,
  },
  {
    path: '**',
    redirectTo: 'page-404',
    pathMatch: 'full',
  },
];
