import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT_TOKEN, Environment } from 'environment';
import { Observable } from 'rxjs';
import { Todo, UpdateTodoRequest } from 'models';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private url!: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_TOKEN) environment: Environment,
  ) {
    this.url = `${environment.apiUrl}/todo`;
  }

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url);
  }

  create(request: UpdateTodoRequest): Observable<Todo> {
    return this.httpClient.post<Todo>(this.url, request);
  }

  update(id: string, request: UpdateTodoRequest): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.url}/${id}`, request);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
