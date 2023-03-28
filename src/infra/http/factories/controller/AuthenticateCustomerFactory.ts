import { Controller } from '@core/infra/Controller';
import { PrismaCustomerRepository } from '@modules/accounts/repository/prisma/PrismaCustomerRepository';
import { AuthenticateCustomer } from '@modules/accounts/useCases/AuthenticateCustomer/AuthenticateCustomer';
import { AuthenticateCustomerController } from '@modules/accounts/useCases/AuthenticateCustomer/AuthenticateCustomerController';
import { PrismaCustomerAuthExpRepository } from '../../../../modules/accounts/repository/prisma/PrismaCustomerAuthExpRepository';

export function makeAuthenticateCustomerController(): Controller {
    const primasCustomerRepository = new PrismaCustomerRepository();
    const prismaCustomerAuthExpRepository = new PrismaCustomerAuthExpRepository();
    const authenticateCustomer = new AuthenticateCustomer(
        primasCustomerRepository,
        prismaCustomerAuthExpRepository
    );
    
    return new AuthenticateCustomerController(authenticateCustomer);
}
