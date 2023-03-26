import { Either, left, right } from "@core/logic/Either";
import { InvalidateCustomerArguments } from "../errors/InvalidateCustomerArguments";

export class Email {
    private readonly email: string;

    constructor(email: string) {
        this.email = email;
    }

    get value(): string { 
        return this.email; 
    }

    static format(email: string): string {
        return email.trim().toLowerCase();
    }

    static isValid(email: string): boolean {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email || !regex.test(email)) {
            return false;
        }

        return true;
    }

    static create(email: string): Either<InvalidateCustomerArguments, Email> {
        if (!this.isValid(email)) {
            return left(new InvalidateCustomerArguments(email))
        }

        const formatEmail = this.format(email);

        return right( new Email(formatEmail));
    }
}
