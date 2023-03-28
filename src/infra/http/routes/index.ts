import { Router } from 'express';
import { makeRegisterCustomerController } from '../factories/controller/RegisterCustomerControllerFactory';
import { adapterRouter } from '@core/infra/adapter/express/RouteAdapter';
import { makeAuthenticateCustomerController } from '../factories/controller/AuthenticateCustomerFactory';

const router = Router();

router.get('/', (_, res) => {
    return res.status(200).json({
        hello: 'Hello World'
    });
});

router.post('/register', adapterRouter(makeRegisterCustomerController()));
router.post('/auth', adapterRouter(makeAuthenticateCustomerController()));

export { router };
