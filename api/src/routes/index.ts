import { Router } from 'express';
import { index } from '../handlers/index';

export const indexRouter: Router = Router();

indexRouter.get('/', index);
