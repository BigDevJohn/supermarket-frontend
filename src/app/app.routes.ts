import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/category/components/categories/categories')
            .then(m => m.Categories),
      },
      {
        path: 'categories/new',
        loadComponent: () =>
          import('./features/category/components/category-form/category-form')
            .then(m => m.CategoryForm),
      },
      {
        path: 'categories/edit/:id',
        loadComponent: () =>
          import('./features/category/components/category-form/category-form')
            .then(m => m.CategoryForm),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
