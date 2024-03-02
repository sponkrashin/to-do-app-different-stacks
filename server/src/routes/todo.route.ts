import { Router, Response } from 'express';

const router = Router();

router.get('/', (_, res: Response) => {
  throw new Error('Something');
  res.send('Get to do list');
});

export default router;
