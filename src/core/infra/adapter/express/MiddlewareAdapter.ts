import { Middleware } from "@core/infra/Middleware";
import { NextFunction, Request, Response } from "express";

export function adapterMiddleware(middleware: Middleware) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const requestData = {
            accessToken: request.headers?.['x-access-token'],
            ...(request.headers || {})
        }

        const httpResponse = await middleware.handle(requestData, request.body);

        if (httpResponse.statusCode !== 200) {
            return response.status(httpResponse.statusCode).json({error: httpResponse.body});
        }

        Object.assign(request, httpResponse.body);

        return next();
    }
}
