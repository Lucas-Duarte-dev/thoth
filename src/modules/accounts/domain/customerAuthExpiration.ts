import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

type CustomerAuthExp = {
    token: string
    customer_id: string;
}

export class CustomerAuthExpiration extends Entity<CustomerAuthExp> {
    private constructor(props: CustomerAuthExp, id?: string) {
        super(props, id);
    }

    get token(): string {
        return this.props.token;
    }

    get customerId(): string {
        return this.props.customer_id;
    }

    static create(props: CustomerAuthExp, id?: string): Either<UnauthorizedCustomerError, CustomerAuthExpiration> {
        const customerAuthExp = new CustomerAuthExpiration(props, id);

        return right(customerAuthExp);
    }
}
