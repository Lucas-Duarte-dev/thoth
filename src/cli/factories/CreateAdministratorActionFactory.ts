import { Action } from '@core/cli/Action'
import { PrismaAdministratorRepository } from '@modules/administrator/repository/prisma/PrismaAdministratorRepository'
import { RegisterAdministrator } from '@modules/administrator/useCases/RegisterAdministrator/RegisterAdministrator'
import { PrismaRulesRepository } from '@modules/rules/repository/prisma/PrismaRulesRepository'
import { CreateAdministratorAction } from '../action/CreateAdministratorAction'

export function makeCreateAdministratorAction(): Action {
  const administratorRepository = new PrismaAdministratorRepository()
  const registerAdmin = new RegisterAdministrator(administratorRepository)
  const rulesRepository = new PrismaRulesRepository()
  
  return new CreateAdministratorAction(registerAdmin, rulesRepository)
}
