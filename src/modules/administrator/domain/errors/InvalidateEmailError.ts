import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidateEmailError extends Error implements DomainError {
  constructor() {
    super(`The email information is invalid, please try again.`)
    this.name = 'InvalidateEmailError'
  }
}
