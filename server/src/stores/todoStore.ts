import { Todo } from '../models';

const todos = [
  {
    id: '1',
    title: 'To Do 1',
    tags: ['Tag 1', 'Tag 2'],
  } as Todo,
  {
    id: '2',
    title: 'To Do 2',
  } as Todo,
];

export function getAll(): Todo[] {
  return todos.map(
    (x) =>
      ({
        ...x,
        tags: x.tags ?? [],
      }) as Todo,
  );
}

export function existsById(id: string): boolean {
  return todos.some((x) => x.id === id);
}

export function getById(id: string): Todo | null {
  const todo = todos.find((x) => x.id === id);
  return todo ?? null;
}

export function add(todo: Todo): Todo {
  const newId = (+todos[todos.length - 1].id + 1).toString();
  todo.id = newId;
  todos.push(todo);
  return todo;
}

export function update(todo: Todo): Todo | null {
  const existingTodo = todos.find((x) => x.id === todo.id);
  if (!existingTodo) {
    throw new Error('To Do with such id does not exist.');
  }

  existingTodo.title = todo.title;
  existingTodo.tags = todo.tags;

  return existingTodo;
}

export function remove(id: string): void {
  const existingTodoIndex = todos.findIndex((x) => x.id === id);
  if (existingTodoIndex === -1) {
    throw new Error('To Do with such id does not exist.');
  }

  todos.splice(existingTodoIndex, 1);
}
