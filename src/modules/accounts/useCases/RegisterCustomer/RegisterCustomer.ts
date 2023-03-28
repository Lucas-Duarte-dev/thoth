import { CustomerRepositoryInterface } from "../../repository/CustomerRepositoryInterface";
import { Either, left, right } from '../../../../core/logic/Either';
import { InvalidateCustomerArguments } from '../../domain/errors/InvalidateCustomerArguments';
import { Customer } from '../../domain/customer';
import { AccountAlreadyExists } from '../../domain/errors/AccountAlreadyExists ';
import { KafkaHandler } from "../../../../core/infra/KafkaHandler";
import { Email } from "@modules/accounts/domain/props/email";
import { Password } from '../../domain/props/password';

type RegisterCustomerRequestInterface = {
    name: string;
    email: string;
    password: string;
    remember_me?: boolean;
};

type RegisterCustomerResponseInterface = Either<
    AccountAlreadyExists | InvalidateCustomerArguments,
    Customer
>;

export class RegisterCustomer {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface,
        private readonly kafkaHandler: KafkaHandler
    ) {}

    async execute({name, email, password, remember_me}: RegisterCustomerRequestInterface): Promise<RegisterCustomerResponseInterface> {
        const emailOrError = Email.create(email);
        const passwordOrError = Password.create(password)

        if (emailOrError.isLeft()) {
            return left(emailOrError.value);
        }
        
        if (passwordOrError.isLeft()) {
            return left(passwordOrError.value);
        }

        const customerOrError = Customer.create({
            name,
            email: emailOrError.value,
            password: passwordOrError.value,
            remember_me
        });

        if (customerOrError.isLeft()) {
            return left(customerOrError.value);
        }

        const customer = customerOrError.value;

        const customerAlreadyExists = await this.customerRepository.exists(customer.email.value);

        if (customerAlreadyExists) {
            return left(new AccountAlreadyExists(customer.email.value));
        }

        await this.customerRepository.create(customer)

        await this.kafkaHandler.handle({
            customer: {
                email: customer.email.value,
                name: customer.name
            }
        }, 'toth.new-customer');

        return right(customer);
    }
}
