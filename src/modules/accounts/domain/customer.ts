import { Entity } from '../../../core/domain/Entity'
import { Either, right } from '../../../core/logic/Either'
import { InvalidateCustomerArguments } from './errors/InvalidateCustomerArguments'
import { Email } from '@core/domain/props/email'
import { Password } from '@core/domain/props/password'

interface CustomerPropsInterface {
  name: string
  email: Email
  password: Password
  remember_me: boolean
}

export class Customer extends Entity<CustomerPropsInterface> {
  private constructor(props: CustomerPropsInterface, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get email(): Email {
    return this.props.email
  }

  get password(): Password {
    return this.props.password
  }

  get rememberMe(): boolean {
    return this.props.remember_me
  }

  static create(
    props: CustomerPropsInterface,
    id?: string
  ): Either<InvalidateCustomerArguments, Customer> {
    const customer = new Customer(props, id)

    return right(customer)
  }
}
