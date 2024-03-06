import { Routes } from '@angular/router';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { TodosListComponent } from './todos-list/todos-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TodosListComponent,
  },
  {
    path: 'create',
    component: EditTodoComponent,
  },
  {
    path: 'edit/:id',
    component: EditTodoComponent,
  },
];
