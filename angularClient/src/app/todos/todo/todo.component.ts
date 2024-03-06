import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Todo } from 'models';
import { TodoApiService } from 'services/todo-api.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input()
  todo?: Todo;

  @Output('delete')
  deleteEvent = new EventEmitter();

  constructor(
    private router: Router,
    private todoApi: TodoApiService,
  ) {}

  editTodo(todo: Todo): void {
    this.router.navigate(['todos', 'edit', todo.id], { state: { todo } });
  }

  async deleteTodo(todo: Todo): Promise<void> {
    const confirmation = confirm(`Are you sure you want to delete to do item '${todo.title}'?`);
    if (!confirmation) {
      return;
    }

    await firstValueFrom(this.todoApi.delete(todo.id));
    this.deleteEvent.emit(todo);
  }
}
