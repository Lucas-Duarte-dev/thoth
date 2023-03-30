import { Middleware } from "@core/infra/Middleware";
import { HasAuthenticatedMiddleware } from "@infra/http/middlewares/HasAuthenticatedMiddleware";
import { PrismaCustomerAuthExpRepository } from '../../../../modules/accounts/repository/prisma/PrismaCustomerAuthExpRepository';

export function makeHasAuthenticatedMiddleware(): Middleware {
    return new HasAuthenticatedMiddleware();
}
