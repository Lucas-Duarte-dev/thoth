import { Either, left, right } from '@core/logic/Either'
import { ZodError, z } from 'zod'
import { DomainError } from '../errors/DomainError'

export class Email {
  private readonly email: string

  constructor(email: string) {
    this.email = email
  }

  get value(): string {
    return this.email
  }

  static validate(email: string): String | Boolean {
    const emailRules = z
      .string()
      .email()
      .max(255)
      .transform(data => data.toLocaleLowerCase())

    const parseEmail = emailRules.safeParse(email)

    if (!parseEmail.success) {
      return false
    }

    return parseEmail.data
  }

  static create(email: string): Either<DomainError, Email> {
    const formatEmail = this.validate(email)

    if (!formatEmail) {
      return left(new Error(email))
    }

    return right(new Email(String(formatEmail)))
  }
}
