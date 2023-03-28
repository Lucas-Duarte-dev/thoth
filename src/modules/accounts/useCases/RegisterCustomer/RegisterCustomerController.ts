import { RegisterCustomer } from './RegisterCustomer';
import { Controller } from "@core/infra/Controller";
import { clientError, HTTPResponse , created} from '@core/infra/HTTPResponse';

type RegisterCustomerRequestType = {
    name: string,
    email: string,
    password: string,
    remember_me?: boolean
}

export class RegisterCustomerController  implements Controller {
    constructor(
        private readonly registercustomer: RegisterCustomer
    ) {}

    async handle({name, email, password, remember_me}: RegisterCustomerRequestType): Promise<HTTPResponse> {
        const registerCustomer = await this.registercustomer.execute({
            name,
            email,
            password,
            remember_me
        });

        if (registerCustomer.isLeft()) {
            return clientError(registerCustomer.value);
        }

        return created();
    }
}
