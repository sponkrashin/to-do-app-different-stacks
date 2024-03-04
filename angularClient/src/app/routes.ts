import { Routes } from '@angular/router';
import { TodosListComponent } from './todos-list/todos-list.component';

export const routes: Routes = [
  {
    path: 'todos',
    component: TodosListComponent,
  },
  {
    path: '**',
    redirectTo: '/todos',
  },
];
