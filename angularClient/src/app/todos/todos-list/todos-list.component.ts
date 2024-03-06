import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { TodoComponent } from 'todos/todo/todo.component';
import { Todo } from 'models';
import { TodoApiService } from 'services/todo-api.service';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodoComponent, CommonModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  private reloadSubject = new BehaviorSubject(null);

  constructor(
    private todoApi: TodoApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.todos$ = this.reloadSubject
      .asObservable()
      .pipe(
        switchMap(() =>
          this.todoApi.getAll().pipe(map((x) => x.sort((first, second) => first.title.localeCompare(second.title)))),
        ),
      );
  }

  addTodo(): void {
    this.router.navigate(['todos', 'create']);
  }

  reloadData(): void {
    this.reloadSubject.next(null);
  }
}
