import { Todo } from '../models';
import * as todosRepository from '../repositories/todosRepository';

export async function getAll(): Promise<Todo[]> {
  const databaseTodos = await todosRepository.getAll();

  return databaseTodos.map(
    (x) =>
      ({
        id: x.id,
        title: x.title,
        tags: x.tags ?? [],
      }) as Todo,
  );
}

export function existsById(id: string): Promise<boolean> {
  return todosRepository.existsById(id);
}

export async function add(todo: Todo): Promise<Todo | null> {
  const tags = todo.tags?.length ? todo.tags : null;
  const document = { title: todo.title, tags } as todosRepository.TodoDocument;

  const newId = await todosRepository.add(document);

  todo.id = newId;
  return todo;
}

export async function update(id: string, todo: Todo): Promise<Todo | null> {
  const tags = todo.tags?.length ? todo.tags : null;
  const document = { id, title: todo.title, tags } as todosRepository.TodoDocument;

  await todosRepository.update(document);

  return todo;
}

export function remove(id: string): Promise<void> {
  return todosRepository.remove(id);
}
