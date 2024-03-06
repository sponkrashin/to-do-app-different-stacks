import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./todos/todos-routes').then((x) => x.routes),
  },
  {
    path: '**',
    redirectTo: '/todos',
  },
];
