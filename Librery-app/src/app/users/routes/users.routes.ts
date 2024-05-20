import { Routes } from '@angular/router';

export const booksRoutes: Routes = [
  {
    path: '',
    redirectTo: 'all-books',
    pathMatch: 'full'
  },
  {
    path: 'all-books',
    loadComponent: () => import('../pages/books-search/books-search.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('../pages/book-page/book-page.component')
  }
];
