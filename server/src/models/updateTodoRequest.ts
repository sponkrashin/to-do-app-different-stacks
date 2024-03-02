import { Validator } from '../helpers/validation';

export interface UpdateTodoRequest {
  title: string;
  tags?: string[] | null;
}

const titleValidator = (validator: Validator) =>
  validator('title')
    .notEmpty({
      ignore_whitespace: true,
    })
    .withMessage('Title should be a non-empty string');

const tagsValidator = (validator: Validator) =>
  validator('tags.*').isString().withMessage('Tags should be an array of strings');

export const getUpdateTodoRequestValidationChain = (validator: Validator) => [
  titleValidator(validator),
  tagsValidator(validator),
];
