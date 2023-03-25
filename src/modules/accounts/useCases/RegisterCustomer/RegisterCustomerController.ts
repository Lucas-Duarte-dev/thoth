import { Request, Response } from "express";
import { RegisterCustomer } from './RegisterCustomer';

export class RegisterCustomerController {
    constructor(
        private readonly registercustomer: RegisterCustomer
    ) {}

    async handle(request: Request, response: Response) {
        const {name, email} = request.body;

        const registerCustomer = await this.registercustomer.execute({name, email});

        if (registerCustomer.isLeft()) {
            return response.status(404).json({message: registerCustomer.value.message});
        }

        return response.status(200).json({customer: registerCustomer.value});
    }
}
