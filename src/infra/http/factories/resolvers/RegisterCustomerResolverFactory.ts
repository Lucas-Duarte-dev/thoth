import { Resolver } from '@core/infra/Resolver'
import { RegisterCustomer } from '@modules/accounts/useCases/RegisterCustomer/RegisterCustomer'
import { PrismaCustomerRepository } from '@modules/accounts/repository/prisma/PrismaCustomerRepository'
import { RegisterCustomerResolver } from '@modules/accounts/useCases/RegisterCustomer/RegisterCustomerResolver'

export function makeRegisterCustomerResolver(): Resolver {
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const registerCustomer = new RegisterCustomer(prismaCustomerRepository)

  return new RegisterCustomerResolver(registerCustomer)
}
