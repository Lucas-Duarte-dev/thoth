import { RegisterAdministrator } from '@modules/administrator/useCases/RegisterAdministrator/RegisterAdministrator'
import { RulesRepositoryInterface } from '@modules/rules/repository/RulesRepositoryInterface'
import { Action } from '@core/cli/Action'

type CreateAdministratorRequestType = {
  name: string
  email: string
  username: string
  password: string
}

export class CreateAdministratorAction implements Action {
  constructor(
    private readonly registerAdmin: RegisterAdministrator,
    private readonly rulesRepository: RulesRepositoryInterface
  ) {}

  async execute({
    name,
    email,
    username,
    password,
  }: CreateAdministratorRequestType): Promise<boolean> {
    const rule = await this.rulesRepository.findByName('admin')

    if (!rule) {
      return false
    }

    const adminOrError = await this.registerAdmin.execute({
      name,
      email,
      username,
      password,
      rule_id: rule.id,
    })

    if (adminOrError.isLeft()) {
      console.log(adminOrError.value.message)
    }

    return !!adminOrError.value
  }
}
