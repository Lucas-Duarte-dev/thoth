import { Controller } from "@core/infra/Controller";
import { HTTPResponse, ok, unauthorized } from "@core/infra/HTTPResponse";
import { AuthenticateCustomer } from './AuthenticateCustomer';

type AuhenticateCustomerRequest = {
    email: string
    password: string
}

export class AuthenticateCustomerController implements Controller {
    constructor(private readonly authenticateCustomer: AuthenticateCustomer) {}

    async handle({email, password}: AuhenticateCustomerRequest): Promise<HTTPResponse> {
        const token = await this.authenticateCustomer.execute({email, password});

        if (token.isLeft()) {
            return unauthorized(token.value);
        }

        return ok(token.value);
    }
}
