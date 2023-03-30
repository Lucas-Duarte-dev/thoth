import { test, expect, beforeAll } from 'vitest'
import { InMemoryCustomerRepository } from './InMemoryCustomerRepository'
import { Customer } from '@modules/accounts/domain/customer'
import { createCustomer } from 'test/factories/CustomerFactory'

let customerRepository: InMemoryCustomerRepository
let customer: Customer
let customerNotRemember: Customer

beforeAll(() => {
    customerRepository = InMemoryCustomerRepository.getInstance()
    customer = createCustomer({
        email: 'john@example.com',
        password: 'test12345',
        remember_me: true,
    })

    customerNotRemember = createCustomer({
        email: 'test@example.com',
        password: 'test12345',
        remember_me: false,
    })
})

test('Should be possible created customer', async () => {
    await customerRepository.create(customer)

    expect(customerRepository.customers.length).toBe(1)
})

test('Should be possible updated customer register', async () => {
    await customerRepository.save(customer)

    expect(customerRepository.customers.length).toBe(1)
})

test('Should be possible getting a customer by email.', async () => {
    await customerRepository.create(customer)

    const hasCustomer = await customerRepository.findByEmail('john@example.com')

    expect(hasCustomer).toBe(customer)
})

test('When validating the existence of an email must be returned true', async () => {
    await customerRepository.create(customer)

    const hasCustomer = await customerRepository.exists('john@example.com')

    expect(hasCustomer).toBeTruthy()
})

test('When validating an email non-existent email must be returned false', async () => {
    await customerRepository.create(customer)

    const hasCustomer = await customerRepository.exists('test@example.com')

    expect(hasCustomer).toBeFalsy()
})

test('Should be possible getting the list of customers when the column remember_me true', async () => {
    await customerRepository.create(customerNotRemember)

    const customers = await customerRepository.rememberCustomerList()

    expect(customers.length).toBe(customerRepository.customers.length - 1)
})
