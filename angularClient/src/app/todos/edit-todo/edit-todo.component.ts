import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, firstValueFrom, map, takeUntil } from 'rxjs';
import { Todo, UpdateTodoRequest } from 'models';
import { TodoApiService } from 'services/todo-api.service';

interface RouterState {
  todo: Todo;
}

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent implements OnInit, OnDestroy {
  isNew: WritableSignal<boolean> = signal(true);

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    tags: new FormControl(''),
  });

  private initialData: Todo | null = null;
  private destroySubject = new ReplaySubject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private todoApi: TodoApiService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroySubject.asObservable()),
        map((paramMap) => paramMap.get('id')),
      )
      .subscribe((id) => {
        this.isNew.set(id === null);

        if (!this.isNew()) {
          this.initialData = (this.location.getState() as RouterState).todo;

          this.form.setValue({
            title: this.initialData.title,
            tags: this.initialData.tags.join(','),
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const newData = this.form.getRawValue();

    const todoRequest = {
      title: newData.title!,
      tags: newData.tags ? newData.tags.split(',').map((x) => x.trim()) : null,
    } as UpdateTodoRequest;

    await firstValueFrom(
      this.isNew() ? this.todoApi.create(todoRequest) : this.todoApi.update(this.initialData!.id, todoRequest),
    );

    this.router.navigate(['todos']);
  }
}
