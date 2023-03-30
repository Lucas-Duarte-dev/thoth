import { Router } from 'express';
import { customerRouter } from './customer.routes';
import { testRouter } from './test.routes';

const router = Router();

router.use(customerRouter);
router.use(testRouter);

export { router };
