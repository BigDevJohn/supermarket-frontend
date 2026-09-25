import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/category/categories/categories')
        .then(m => m.Categories),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];