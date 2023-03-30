import { Resolver } from '@core/infra/Resolver'
import { RegisterCustomer } from '@modules/accounts/useCases/RegisterCustomer/RegisterCustomer'
import { PrismaCustomerRepository } from '@modules/accounts/repository/prisma/PrismaCustomerRepository'
import { KafkaMessagingHandler } from '@infra/messaging/kafka/handler/KafkaMessagingHandler'
import { RegisterCustomerResolver } from '@modules/accounts/useCases/RegisterCustomer/RegisterCustomerResolver'

export function makeRegisterCustomerResolver(): Resolver {
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const kafkaHandler = new KafkaMessagingHandler()

  const registerCustomer = new RegisterCustomer(prismaCustomerRepository, kafkaHandler)

  return new RegisterCustomerResolver(registerCustomer)
}
