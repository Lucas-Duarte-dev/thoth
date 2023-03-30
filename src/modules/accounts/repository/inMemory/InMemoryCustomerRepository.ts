import { Customer } from '@modules/accounts/domain/customer'
import { CustomerRepositoryInterface } from '../CustomerRepositoryInterface'

export class InMemoryCustomerRepository implements CustomerRepositoryInterface {
    public customers: Customer[]

    private static instance: InMemoryCustomerRepository

    constructor() {
        this.customers = []
    }

    public static getInstance(): InMemoryCustomerRepository {
        if (!InMemoryCustomerRepository.instance) {
            InMemoryCustomerRepository.instance =
                new InMemoryCustomerRepository()
        }

        return InMemoryCustomerRepository.instance
    }

    async exists(email: string): Promise<boolean> {
        return !!this.customers.find(
            (customer) => customer.email.value === email,
        )
    }

    async findByEmail(email: string): Promise<Customer> {
        return this.customers.find((customer) => customer.email.value === email)
    }

    async save(customer: Customer): Promise<void> {
        const existingCustomer = this.customers.find(
            (data) => data.id === customer.id,
        )

        const index = this.customers.findIndex(
            (data) => data.id === customer.id,
        )

        const updatedCustomer = Object.assign(existingCustomer, customer)

        this.customers[index] = updatedCustomer
    }

    async create(customer: Customer): Promise<void> {
        this.customers.push(customer)
    }

    async rememberCustomerList(): Promise<Customer[]> {
        return this.customers.filter((customer) => customer.rememberMe === true)
    }
}
