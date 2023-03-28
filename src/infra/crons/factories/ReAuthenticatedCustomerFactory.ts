import { Command } from "@core/infra/Command";
import { ReAuthenticatedCustomerCommand } from "@modules/accounts/command/ReAuthenticatedCustomerCommand";
import { PrismaCustomerAuthExpRepository } from "@modules/accounts/repository/prisma/PrismaCustomerAuthExpRepository";
import { PrismaCustomerRepository } from "@modules/accounts/repository/prisma/PrismaCustomerRepository";
import { AuthenticateCustomer } from '@modules/accounts/useCases/AuthenticateCustomer/AuthenticateCustomer';

export function makeReAuthenticatedCustomer(): Command {
    const customerRepository = new PrismaCustomerRepository();
    const customerAuthExpRepository = new PrismaCustomerAuthExpRepository();

    const authenticateCustomer = new AuthenticateCustomer(customerRepository, customerAuthExpRepository);

    return new ReAuthenticatedCustomerCommand(
        customerRepository,
        authenticateCustomer,
        customerAuthExpRepository
    )
}
