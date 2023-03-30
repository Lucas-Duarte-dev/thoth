import { HTTPResponse, forbidden, ok } from '@core/infra/HTTPResponse';
import { Middleware } from '@core/infra/Middleware';
import { decode } from 'jsonwebtoken';
import { AccessDeniedError } from '../errors/AccessDeniedError';
import { fail } from '../../../core/infra/HTTPResponse';

type HasAuthenticatedRequestInterface = {
    accessToken: string,
}

type DecodeJWT = {
    sub: string
}

export class HasAuthenticatedMiddleware implements Middleware {
    async handle({accessToken}: HasAuthenticatedRequestInterface): Promise<HTTPResponse> {
        try {
            if (accessToken) {
                try {
                    const decoded = decode(accessToken) as DecodeJWT;

                    return ok({customerId: decoded.sub});
                } catch (err) {
                    return forbidden(new AccessDeniedError());
                }
            }

            return forbidden(new AccessDeniedError());
        } catch (err) {
            return fail(err)
        }
    }

}

export namespace AuthMiddleware {
    export type Request = {
      accessToken?: string
    }
  }
