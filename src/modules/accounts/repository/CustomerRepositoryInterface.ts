import { Customer } from '../domain/customer';

export interface CustomerRepositoryInterface {
    exists(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<Customer>;
    save(customer: Customer): Promise<void>;
    create(customer: Customer): Promise<void>;
}
