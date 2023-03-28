import { compare, hash, hashSync } from "bcrypt";
import { z } from "zod";
import { Either } from '@core/logic/Either';
import { InvalidateCustomerArguments } from "../errors/InvalidateCustomerArguments";
import { left, right } from '@core/logic/Either';

export class Password {
    private readonly password: string;
    private readonly hashed: boolean

    constructor(password: string, hashed: boolean) {
        this.password = password;
        this.hashed = hashed;
    }

    static validate(password: string): boolean {
        const passwordRule = z.string().trim().min(6).max(255);

        const parsePassword = passwordRule.safeParse(password);

        return parsePassword.success;
    }

    public async getHashedValue(): Promise<string> {
        if (this.hashed) {
            return this.password
        }

        return await hash(this.password, 8);
    }

    public async comparePassword(textPassword: string): Promise<boolean> {
        let hashed: string

        if (this.hashed) {
          hashed = this.password
    
          return await compare(textPassword, hashed)
        }

        return this.password === textPassword
    }

    static create(
        password: string,
        hashed: boolean = false
    ): Either<InvalidateCustomerArguments, Password> {
        if (!this.validate(password)) {
            return left(new InvalidateCustomerArguments('password'));
        }

        return right(new Password(password, hashed)); 
    }
}
