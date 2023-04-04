import { Controller } from '@core/infra/Controller'
import { PrismaAdministratorRepository } from '@modules/administrator/repository/prisma/PrismaAdministratorRepository'
import { RegisterAdministrator } from '@modules/administrator/useCases/RegisterAdministrator/RegisterAdministrator'
import { RegisterAdministratorController } from '@modules/administrator/useCases/RegisterAdministrator/RegisterAdministratorController'

export function makeRegisterAdministratorController(): Controller {
  const prismaAdminRepository = new PrismaAdministratorRepository()
  const registerAdmin = new RegisterAdministrator(prismaAdminRepository);
  
  return new RegisterAdministratorController(registerAdmin);
}
