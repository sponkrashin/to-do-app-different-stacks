import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationMiddleware = (request: Request<any>, response: Response, next: NextFunction) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    response.statusCode = 400;
    response.send({ validationErrors: result.array() });
    return;
  }

  next();
};
