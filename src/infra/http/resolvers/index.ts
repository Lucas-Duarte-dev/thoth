import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CustomerModel } from '@modules/accounts/dtos/models/CustomerModel'
import { CreateCustomerInput } from '@modules/accounts/dtos/input/CreateCustomerInput'
import { makeRegisterCustomerResolver } from '../factories/resolvers/RegisterCustomerResolverFactory'

@Resolver()
export class Resolvers {
  @Query(() => String)
  async helloWorld() {
    return 'Hello World!'
  }

  @Mutation(() => CustomerModel)
  async registerCustomer(
    @Arg('args', () => CreateCustomerInput, { validate: false }) args: CreateCustomerInput
  ) {
    return await makeRegisterCustomerResolver().handle({
      name: args.name,
      email: args.email,
      password: args.password,
      remember_me: args.remember_me,
    })
  }
}
