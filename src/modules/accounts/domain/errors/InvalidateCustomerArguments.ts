import { Customer } from '../customer';

export class InvalidateCustomerArguments extends Error {
    constructor(argument: string) {
        super(`customer arguments ${argument} is invalid.`);
        this.name = 'InvalidateCustomerArguments';
    }
}
