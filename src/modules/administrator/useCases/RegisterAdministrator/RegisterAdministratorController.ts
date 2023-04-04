import { Controller } from '@core/infra/Controller'
import { created, fail, HTTPResponse } from '@core/infra/HTTPResponse'
import { RegisterAdministrator } from '@modules/administrator/useCases/RegisterAdministrator/RegisterAdministrator'

type RegisterAdminRequestType = {
  name: string
  email: string
  username: string
  password: string
  rule_id: string
}

export class RegisterAdministratorController implements Controller {
  constructor(private readonly registerAdmin: RegisterAdministrator) {}
  
  async handle({name, email, username, password, rule_id}: RegisterAdminRequestType): Promise<HTTPResponse> {
    const adminOrError = await this.registerAdmin.execute({
      name,
      email,
      username,
      password,
      rule_id
    })
    
    if (adminOrError.isLeft()) {
      return fail(adminOrError.value)
    }
    
    return created()
  }
}
