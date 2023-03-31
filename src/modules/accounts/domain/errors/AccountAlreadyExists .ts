import { DomainError } from '@core/domain/errors/DomainError'

export class AccountAlreadyExists extends Error implements DomainError {
  constructor(email: string) {
    super(`Customer with email ${email} already exists.`)
    this.name = 'AccountAlreadyExists'
  }
}
