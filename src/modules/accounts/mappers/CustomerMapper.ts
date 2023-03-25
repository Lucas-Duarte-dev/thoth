import { Customer as PercistenceCustomer } from '@prisma/client'
import { Customer } from '../domain/customer';

export class CustomerMapper {
    static toDomain(raw: PercistenceCustomer): Customer {
        const customer = Customer.create({
            name: raw.name,
            email: raw.email
        }, raw.id);

        if (customer.isLeft()) {
            return null;
        }

        return customer.value;
    }

    static async toPersistence(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email
        }
    }
}
