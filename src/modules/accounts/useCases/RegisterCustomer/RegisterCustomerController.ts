import { RegisterCustomer } from './RegisterCustomer';
import { Controller } from "@core/infra/Controller";
import { clientError, HTTPResponse , created} from '@core/infra/HTTPResponse';

type RegisterCustomerRequestType = {
    name: string,
    email: string
}

export class RegisterCustomerController  implements Controller {
    constructor(
        private readonly registercustomer: RegisterCustomer
    ) {}

    async handle({name, email}: RegisterCustomerRequestType): Promise<HTTPResponse> {
        const registerCustomer = await this.registercustomer.execute({name, email});

        if (registerCustomer.isLeft()) {
            return clientError(registerCustomer.value);
        }

        return created();
    }
}
