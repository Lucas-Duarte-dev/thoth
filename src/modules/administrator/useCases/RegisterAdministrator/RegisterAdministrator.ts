import { DomainError } from '@core/domain/errors/DomainError'
import { Email } from '@core/domain/props/email'
import { Password } from '@core/domain/props/password'
import { Username } from '@core/domain/props/username'
import { Either } from '@core/logic/Either'
import { Administrator } from '@modules/administrator/domain/administrator'
import { left, right } from '../../../../core/logic/Either'
import { InvalidateEmailError } from '../../domain/errors/InvalidateEmailError'
import { InvalidateUsernameError } from '@modules/administrator/domain/errors/InvalidateUsernameError'
import { InvalidatePasswordError } from '@modules/administrator/domain/errors/InvalidatePasswordError'
import { AdministratorRepositoryInterface } from '@modules/administrator/repository/AdministratorRepositoryInterface'
import { AdministratorAlreadyExistsError } from '../../domain/errors/AdministratorAlreadyExistsError'

type RegisterAdministratorRequestType = {
  name: string
  email: string
  username: string
  password: string
  rule_id: string
}

type RegisterAdministratorResponseType = Either<DomainError, Administrator>

export class RegisterAdministrator {
  constructor(private readonly administratorRepository: AdministratorRepositoryInterface) {}

  async execute({
    name,
    email,
    username,
    password,
    rule_id,
  }: RegisterAdministratorRequestType): Promise<RegisterAdministratorResponseType> {
    const emailOrError = Email.create(email)
    const usernameOrError = Username.create(username)
    const passwordOrError = Password.create(password)

    if (emailOrError.isLeft()) {
      return left(new InvalidateEmailError())
    }

    if (usernameOrError.isLeft()) {
      return left(new InvalidateUsernameError())
    }

    if (passwordOrError.isLeft()) {
      return left(new InvalidatePasswordError())
    }

    const adminOrError = Administrator.create({
      name,
      email: emailOrError.value,
      username: usernameOrError.value,
      password: passwordOrError.value,
      rule_id,
    })

    if (adminOrError.isLeft()) {
      return left(adminOrError.value)
    }

    const administrator = adminOrError.value

    const hasAdmin = await this.administratorRepository.exists(
      administrator.email.value,
      administrator.username.value
    )

    if (hasAdmin) {
      return left(new AdministratorAlreadyExistsError())
    }

    await this.administratorRepository.create(administrator)

    return right(administrator)
  }
}
