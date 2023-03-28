import { Command } from '@core/infra/Command';
import { CustomerAuthExpirationRepositoryInterface } from '../repository/CustomerAuthExpirationRepositoryInterface';
import { CustomerRepositoryInterface } from '../repository/CustomerRepositoryInterface';
import { AuthenticateCustomer } from '../useCases/AuthenticateCustomer/AuthenticateCustomer';

export class ReAuthenticatedCustomerCommand implements Command {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface,
        private readonly customerAuthenticate: AuthenticateCustomer,
        private readonly customerAuthExpRepository: CustomerAuthExpirationRepositoryInterface
    ) {}

    async execute(): Promise<void> {
        const customerRememberList = await this.customerRepository.rememberCustomerList();

        for (const customer of customerRememberList) {
            const customerHasAuth = await this.customerAuthExpRepository.exists(customer.id);

            if (!customerHasAuth) {
                continue;
            }

            const customerAuth = await this.customerAuthenticate.execute({
                email: customer.email.value,
                password: await customer.password.getHashedValue()
            });

            if (customerAuth.isLeft()) {
                continue;
            }
        }
    }
}
