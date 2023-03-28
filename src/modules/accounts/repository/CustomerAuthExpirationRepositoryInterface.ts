import { CustomerAuthExpiration } from "../domain/customerAuthExpiration";

export interface CustomerAuthExpirationRepositoryInterface {
    exists(customerId: string): Promise<boolean>;
    findByCustomerId(customerId: string): Promise<CustomerAuthExpiration>;
    create(customerAuth: CustomerAuthExpiration): Promise<void>;
    save(customerAuth: CustomerAuthExpiration): Promise<void>;
}
