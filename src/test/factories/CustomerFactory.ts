import { Customer } from '@modules/accounts/domain/customer'
import { Email } from '@core/domain/props/email'
import { Password } from '@core/domain/props/password'

type CustomerPropsType = {
  name?: string
  email: string
  password: string
  remember_me?: boolean
}

export function createCustomer(data?: CustomerPropsType): Customer {
  const email = Email.create(data.email).value as Email
  const password = Password.create(data.password).value as Password

  const customer = Customer.create({
    name: data.name || 'John Doe',
    email,
    password,
    remember_me: data.remember_me || false,
  })

  return customer.value as Customer
}
