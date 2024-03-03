import { Router, Request, Response } from 'express';
import { body as validator } from 'express-validator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { Todo, UpdateTodoRequest, getUpdateTodoRequestValidationChain } from '../models';
import * as todoService from '../services/todosService';

interface TodoIdParams {
  id: string;
}

const router = Router();

router.get('/', async (_, response: Response) => {
  const todos = await todoService.getAll();
  response.send(todos);
});

router.post(
  '/',
  getUpdateTodoRequestValidationChain(validator),
  validationMiddleware,
  async (request: Request<any, any, UpdateTodoRequest>, response: Response) => {
    const newTodo = await todoService.add({
      title: request.body.title,
      tags: request.body.tags,
    } as Todo);

    response.send(newTodo);
  },
);

router.put(
  '/:id',
  getUpdateTodoRequestValidationChain(validator),
  validationMiddleware,
  async (request: Request<TodoIdParams, any, UpdateTodoRequest>, response: Response) => {
    const todoExists = await todoService.existsById(request.params.id);
    if (!todoExists) {
      response.sendStatus(404);
      return;
    }

    const updatedTodo = await todoService.update(request.params.id, {
      title: request.body.title,
      tags: request.body.tags,
    } as Todo);

    response.send(updatedTodo);
  },
);

router.delete('/:id', async (request: Request<TodoIdParams>, response: Response) => {
  const todoExists = await todoService.existsById(request.params.id);
  if (!todoExists) {
    response.sendStatus(404);
    return;
  }

  await todoService.remove(request.params.id);
  response.sendStatus(204);
});

export default router;
