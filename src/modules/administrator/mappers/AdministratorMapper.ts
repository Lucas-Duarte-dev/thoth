import { AdministratorCustomer as PercistenceAdministrator } from '@prisma/client'
import { Administrator } from '../domain/administrator'
import { Email } from '@core/domain/props/email'
import { Username } from '@core/domain/props/username'
import { Password } from '@core/domain/props/password'

export class AdministratorMapper {
  static toDomain(raw: PercistenceAdministrator): Administrator {
    const emailOrError = Email.create(raw.email)
    const usernameOrError = Username.create(raw.username)
    const passwordOrError = Password.create(raw.password)

    if (emailOrError.isLeft()) {
      return null
    }

    if (usernameOrError.isLeft()) {
      return null
    }

    if (passwordOrError.isLeft()) {
      return null
    }

    const admin = Administrator.create({
      name: raw.name,
      email: emailOrError.value,
      username: usernameOrError.value,
      password: passwordOrError.value,
      rule_id: raw.rule_id,
    })

    if (admin.isLeft()) {
      return null
    }

    return admin.value
  }

  static async toPersistence(admin: Administrator) {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email.value,
      username: admin.username.value,
      password: await admin.password.getHashedValue(),
      rule_id: admin.ruleId,
    }
  }
}
