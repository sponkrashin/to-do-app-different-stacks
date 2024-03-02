import { Router, Request, Response } from 'express';
import { Todo, UpdateTodoRequest } from '../models';
import * as todoStore from '../stores/todoStore';

interface TodoIdParams {
  id: string;
}

const router = Router();

router.get('/', (_, response: Response) => {
  response.send(todoStore.getAll());
});

router.post('/', (request: Request<any, any, UpdateTodoRequest>, response: Response) => {
  const newTodo = todoStore.add({
    title: request.body.title,
    tags: request.body.tags,
  } as Todo);

  response.statusCode = 204;
  response.send(newTodo);
});

router.put('/:id', (request: Request<TodoIdParams, any, UpdateTodoRequest>, response: Response) => {
  if (!todoStore.existsById(request.params.id)) {
    response.sendStatus(404);
    return;
  }

  const updatedTodo = todoStore.update({
    id: request.params.id,
    title: request.body.title,
    tags: request.body.tags,
  } as Todo);

  response.statusCode = 204;
  response.send(updatedTodo);
});

router.delete('/:id', (request: Request<TodoIdParams>, response: Response) => {
  if (!todoStore.existsById(request.params.id)) {
    response.sendStatus(404);
    return;
  }

  todoStore.remove(request.params.id);
  response.sendStatus(204);
});

export default router;
