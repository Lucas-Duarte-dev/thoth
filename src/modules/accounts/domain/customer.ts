import { Entity } from '../../../core/domain/Entity';
import { Either, right } from '../../../core/logic/Either';
import { InvalidateCustomerArguments } from './errors/InvalidateCustomerArguments';

interface CustomerPropsInterface {
    name: string
    email: string
}

export class Customer extends Entity<CustomerPropsInterface> {
    private constructor(props: CustomerPropsInterface, id?: string) {
        super(props, id);
    }

    get name(): string { 
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    static create(props: CustomerPropsInterface, id?: string): Either<InvalidateCustomerArguments, Customer> {
        const customer = new Customer(props, id);

        return right(customer);
    }
}
