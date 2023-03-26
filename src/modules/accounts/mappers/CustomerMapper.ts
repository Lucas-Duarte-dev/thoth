import { Customer as PercistenceCustomer } from '@prisma/client'
import { Customer } from '../domain/customer';
import { Email } from '@modules/accounts/domain/validators/email';

export class CustomerMapper {
    static toDomain(raw: PercistenceCustomer): Customer {
        const email = Email.create(raw.email);

        if (email.isLeft()) {
            return null;
        }

        const customer = Customer.create({
            name: raw.name,
            email: email.value
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
            email: customer.email.value
        }
    }
}
