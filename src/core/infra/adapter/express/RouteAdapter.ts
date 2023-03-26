import { Request, Response } from 'express';
import { Controller } from '../../Controller';

export function adapterRouter(controller: Controller) {
    return async function (request: Request, response: Response) {
        const requestData = {
            ...request.body,
            ...request.params
        }

        const httpResponse = await controller.handle(requestData);

        return response.status(httpResponse.statusCode).json(httpResponse.body);
    }
}
