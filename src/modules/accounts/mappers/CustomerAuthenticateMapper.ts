import { CustomerAuthExpiration as PersistenceCustomerAuthExp } from '@prisma/client';
import { CustomerAuthExpiration } from '../domain/customerAuthExpiration';

export class CustomerAuthenticateMapper {
    static toDomain(raw: PersistenceCustomerAuthExp): CustomerAuthExpiration {
        const customerAuthExp = CustomerAuthExpiration.create({
            token: raw.token,
            customer_id: raw.customer_id
        }, raw.id);

        if (customerAuthExp.isLeft()) {
            return null;
        }

        return customerAuthExp.value;
    }

    static toPersistence(customerAuthExp: CustomerAuthExpiration) {
        return {
            id: customerAuthExp.id,
            token: customerAuthExp.token,
            customer_id: customerAuthExp.customerId
        };
    }
}
