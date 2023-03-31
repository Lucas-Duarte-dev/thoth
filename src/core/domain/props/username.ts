import { Either, left, right } from '@core/logic/Either'
import { z } from 'zod'
import { DomainError } from '../errors/DomainError'

export class Username {
  private readonly username: string

  constructor(username: string) {
    this.username = username
  }

  get value(): string {
    return this.username
  }

  static validate(username: string): string | boolean {
    const usernameRules = z.string().min(5).max(100).trim()

    const formatterUsername = usernameRules.safeParse(username)

    if (formatterUsername.success) {
      return formatterUsername.data
    }

    return formatterUsername.success
  }

  static create(username: string): Either<DomainError, Username> {
    const isValid = this.validate(username)

    if (!isValid) {
      return left(new Error('Invalid username'))
    }

    return right(new Username(String(isValid)))
  }
}
