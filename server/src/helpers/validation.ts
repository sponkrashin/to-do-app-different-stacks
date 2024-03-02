import { ValidationChain } from 'express-validator';

export type Validator = (field: string) => ValidationChain;
