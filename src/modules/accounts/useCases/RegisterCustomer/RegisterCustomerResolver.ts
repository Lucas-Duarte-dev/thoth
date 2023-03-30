import { CreateCustomerInput } from '@modules/accounts/dtos/input/CreateCustomerInput'
import { CustomerModel } from '@modules/accounts/dtos/models/CustomerModel'
import { RegisterCustomer } from './RegisterCustomer'
import { Resolver } from '@core/infra/Resolver'

export class RegisterCustomerResolver implements Resolver {
  constructor(private readonly registerCustomer: RegisterCustomer) {}

  async handle(args: CreateCustomerInput): Promise<CustomerModel> {
    const customerOrError = await this.registerCustomer.execute({
      name: args.name,
      email: args.email,
      password: args.password,
      remember_me: args.remember_me,
    })

    if (customerOrError.isLeft()) {
      return null
    }

    const { name, email, rememberMe } = customerOrError.value

    return {
      name,
      email: email.value,
      remember_me: rememberMe,
    }
  }
}
