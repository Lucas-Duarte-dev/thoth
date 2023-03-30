import { Router } from "express";
import { adapterMiddleware } from '../../../core/infra/adapter/express/MiddlewareAdapter';
import { makeHasAuthenticatedMiddleware } from '../factories/middlewares/HasAuthenticatedMiddlewareFactory';

const testRouter = Router();

testRouter.use(adapterMiddleware(makeHasAuthenticatedMiddleware()));

testRouter.get('/', (_, res) => {
    return res.json({
        hello: 'world',
    })
})

export {testRouter}
