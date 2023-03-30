import { Router } from "express";
import { makeRegisterCustomerController } from '../factories/controller/RegisterCustomerControllerFactory';
import { adapterRouter } from '@core/infra/adapter/express/RouteAdapter';
import { makeAuthenticateCustomerController } from '../factories/controller/AuthenticateCustomerFactory';

const customerRouter = Router();

customerRouter.post('/register', adapterRouter(makeRegisterCustomerController()));
customerRouter.post('/auth', adapterRouter(makeAuthenticateCustomerController()));

export {customerRouter}
