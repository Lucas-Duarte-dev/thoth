import { prisma } from '@infra/databse/prisma/prisma';
import { Customer } from '../../domain/customer';
import { CustomerMapper } from '../../mappers/CustomerMapper';
import { CustomerRepositoryInterface } from '../CustomerRepositoryInterface';

export class PrismaCustomerRepository implements CustomerRepositoryInterface {
    async rememberCustomerList(): Promise<Customer[]> {
        const persistentCustomerList = await prisma.customer.findMany({
            where: {remember_me: true}
        });

        return persistentCustomerList.map(customer => CustomerMapper.toDomain(customer));
    }

    async exists(email: string): Promise<boolean> {
        return !!await prisma.customer.findUnique({
            where: { email },
          });
    }

    async findByEmail(email: string): Promise<Customer> {
        const user = await prisma.customer.findUnique({
            where: { email }
        });

        if (!user) {
            return null;
        }

        return CustomerMapper.toDomain(user);
    }

    async save(customer: Customer): Promise<void> {
        const percistenceCustomer = await CustomerMapper.toPersistence(customer);

        await prisma.customer.update({
            where: {id: percistenceCustomer.id},
            data: percistenceCustomer
        });
    }

    async create(customer: Customer): Promise<void> {
        const percistenceCustomer = await CustomerMapper.toPersistence(customer);

        await prisma.customer.create({data: percistenceCustomer});
    }
}
