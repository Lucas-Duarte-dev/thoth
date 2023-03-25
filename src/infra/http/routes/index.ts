import { Router } from 'express';
import { makeRegisterCustomerController } from '../factories/controller/RegisterCustomerControllerFactory';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        hello: 'Hello World'
    });
});

router.post('/register', (req, res) => {
    makeRegisterCustomerController().handle(req, res)
});

export { router };
