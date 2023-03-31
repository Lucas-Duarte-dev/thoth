import { Entity } from '@core/domain/Entity'
import { DomainError } from '@core/domain/errors/DomainError'
import { Email } from '@core/domain/props/email'
import { Password } from '@core/domain/props/password'
import { Username } from '@core/domain/props/username'
import { Either, right } from '@core/logic/Either'

type AdministratorPropsType = {
  name: string
  email: Email
  username: Username
  password: Password
  rule_id: string
}

export class Administrator extends Entity<AdministratorPropsType> {
  constructor(props: AdministratorPropsType, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get email(): Email {
    return this.props.email
  }

  get username(): Username {
    return this.props.username
  }

  get password(): Password {
    return this.props.password
  }

  get ruleId(): string {
    return this.props.rule_id
  }

  static create(props: AdministratorPropsType, id?: string): Either<DomainError, Administrator> {
    return right(new Administrator(props, id))
  }
}
