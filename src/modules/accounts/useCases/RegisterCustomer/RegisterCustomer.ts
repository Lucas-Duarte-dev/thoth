import { CustomerRepositoryInterface } from "../../repository/CustomerRepositoryInterface";
import { Either, left, right } from '../../../../core/logic/Either';
import { InvalidateCustomerArguments } from '../../domain/errors/InvalidateCustomerArguments';
import { Customer } from '../../domain/customer';
import { AccountAlreadyExists } from '../../domain/errors/AccountAlreadyExists ';
import { producer } from '../../../../infra/messaging/kafka/producer';
import { KafkaHandler } from "../../../../core/infra/KafkaHandler";

type RegisterCustomerRequestInterface = {
    name: string;
    email: string;
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

    async execute({name, email}: RegisterCustomerRequestInterface): Promise<RegisterCustomerResponseInterface> {
        const customerOrError = Customer.create({name, email});

        if (customerOrError.isLeft()) {
            return left(customerOrError.value);
        }

        const customer = customerOrError.value;

        const customerAlreadyExists = await this.customerRepository.exists(customer.email);

        if (customerAlreadyExists) {
            return left(new AccountAlreadyExists(customer.email));
        }

        await this.customerRepository.create(customer)


        await this.kafkaHandler.handle({
            customer: {
                email: customer.email,
                name: customer.name
            }
        }, 'toth.new-customer');

        return right(customer);
    }
}
